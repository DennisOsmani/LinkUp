
using Repositories;
using Interfaces;
using Models;
using System.Collections.ObjectModel;
using Enums;
using System.Net.Http.Headers;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace Services;

public class EventService : IEventService
{
    public readonly EventRepository _eventRepo;
    public readonly UserRelationRepository _userRelRepo;
    public readonly EventRelationRepository _eventRelRepo;
    public readonly UserRepository _userRepo;
    public readonly LocationService _locationService;

    public EventService(EventRepository eventRepository, UserRelationRepository userRelationRepository, EventRelationRepository eventRelRepo, UserRepository userRepo, LocationService locationService)
    {
        _eventRepo = eventRepository;
        _userRelRepo = userRelationRepository;
        _eventRelRepo = eventRelRepo;
        _userRepo = userRepo;
        _locationService = locationService;
    }

    public async Task<Event?> GetEventByID(int eventId)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with EventID: {eventId}, does not exist! (EventService)");
        }

        return eventt;
    }


    public async Task<ICollection<Event>> GetEventsInCity(string city, string userId)
    {
        return await _eventRepo.GetEventsInCity(city, userId);

        /*ALTERNATIVE TO THE INSANE QUERY IN REPO
        var events = await _eventRepo.GetEventsInCity(city);

        ICollection<Event> filteredEvents = new List<Event>();

        foreach (var ev in events)
        {
            var relation = await _eventRelRepo.GetEventRelation(ev.EventID, userId);
            if (relation == null)
            {
                filteredEvents.Add(ev);
            }
        }
        return filteredEvents;
        */

    }

    public async Task<User> GetHostForEvent(int eventId)
    {

        User? user = await _eventRepo.GetHostForEvent(eventId);

        if (user == null)
        {
            throw new KeyNotFoundException($"Could not find host for event with ID: {eventId} (EventService)");
        }
        return user;
    }
    public async Task<ICollection<Event>> GetUserFriendEvents(string userId)
    {
        ICollection<User?> friends = await _userRelRepo.GetUserFriends(userId);

        if (friends.Count.Equals(0))
        {
            return new Collection<Event>();
        }

        List<string> userIds = friends
            .Select(u => u.UserID).ToList();

        return await _eventRepo.GetUserFriendEvents(userIds, userId);
    }

    public async Task<ICollection<Event?>> GetUserEventInvites(string userId)
    {
        return await _eventRepo.GetUserEventInvites(userId);
    }

    public async Task<ICollection<Event?>> GetUserJoinedEvents(string userId)
    {
        return await _eventRepo.GetUserJoinedEvents(userId);
    }

    // Refaktoreres ? </3
    public async Task<Event?> CreateEvent(Event newEvent, string creatorUserId)
    {

        if (newEvent == null)
        {
            throw new ArgumentNullException($"Cannot create empty event! (EventService)");
        }

        User? user = await _userRepo.GetUserByID(creatorUserId);

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID: {creatorUserId}, does not exist! (EventService)");
        }

        EventRelation eventRelation = new EventRelation(newEvent.EventID, creatorUserId, EventRelationParticipation.JOINED, EventRole.CREATOR);
        eventRelation.Event = newEvent;
        await _eventRelRepo.CreateEventRelation(eventRelation);

        user.EventsCreated++;
        await _userRepo.UpdateUser(creatorUserId, user);

        return newEvent;
    }

    public async Task<Event> UpdateEvent(Event updatedEvent)
    {
        Event? oldEvent = await _eventRepo.GetEventByID(updatedEvent.EventID);

        if (updatedEvent == null)
        {
            throw new ArgumentNullException($"Cannot create empty event! (EventService)");
        }

        if (oldEvent == null)
        {
            throw new KeyNotFoundException($"Event with eventID: {updatedEvent.EventID}, does not exist! (EventService)");
        }

        return await _eventRepo.UpdateEvent(updatedEvent, oldEvent);
    }

    public async Task DeleteEvent(int eventId)
    {
        Event? eventToDelete = await _eventRepo.GetEventByID(eventId);

        if (eventToDelete == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, was not found!");
        }
        ICollection<EventRelation> eventRelations = await _eventRelRepo.GetAllEventRelations(eventId);

        foreach (var evRel in eventRelations)
        {
            await _eventRelRepo.DeleteUserFromEvent(evRel);
        }

        var locationId = eventToDelete.LocationID;

        await _eventRepo.DeleteEvent(eventToDelete);
        await _locationService.DeleteLocation(locationId);
    }

    public async Task<bool> CanUserViewEvent(int eventId, string userId)
    {
        EventRelation? eventRel = await _eventRelRepo.GetEventRelation(eventId, userId);


        if (eventRel == null || (eventRel != null && eventRel.EventRelationParticipation != EventRelationParticipation.JOINED))
        {
            return false;
        }

        return true;
        /*
        DENNE VIL VISE EVENT TILGANG BASERT PÅ INVITASJONER OSV....

        Event? eventt = await _eventRepo.GetEventByID(eventId);

        var creatorList = await _eventRelRepo.GetUsersFromEventByRole(eventId, EventRole.CREATOR);
        User? creator = creatorList.FirstOrDefault();
        User? user = await _userRepo.GetUserByID(userId);
        UserRelation? userRelation = await _userRelRepo.GetOneUserRelation(user.UserID, creator.UserID);

        if (eventt == null || eventRel == null || creator == null || user == null || userRelation == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, or user with ID: {userId} was not found! (EventService)");
        }

        if (eventt.Visibility == Visibility.PUBLIC)
        {
            return true;
        }
        if (eventt.Visibility == Visibility.FRIENDS && userRelation.Type == UserRelationType.FRIENDS)
        {
            return true;
        }
        if (eventt.Visibility == Visibility.PRIVATE)
        {
            return true;
        }

        return false;
        */
    }

    public async Task<bool> CanUserUpdateEvent(int eventId, string userId)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId},  was not found! (EventService)");
        }

        ICollection<User> creatorList = await _eventRelRepo.GetUsersFromEventByRole(eventId, EventRole.CREATOR);
        ICollection<User> hostList = await _eventRelRepo.GetUsersFromEventByRole(eventId, EventRole.HOST);

        List<User> allowedList = creatorList.Concat(hostList).ToList();

        return allowedList.Any(user => user.UserID == userId);
    }

    public async Task<bool> CanUserDeleteEvent(int eventId, string userId)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId},  was not found! (EventService)");
        }

        var creatorList = await _eventRelRepo.GetUsersFromEventByRole(eventId, EventRole.CREATOR);
        User? creator = creatorList.FirstOrDefault();

        return creator.UserID == userId;

    }
}
