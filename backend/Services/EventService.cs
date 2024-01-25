
using Repositories;
using Interfaces;
using Models;
using System.Collections.ObjectModel;

namespace Services;

public class EventService : IEventService
{

    public readonly EventRepository _eventRepo;
    public readonly UserRelationRepository _userRelRepo;
    public readonly EventRelationService _eventRelService;
    public readonly LocationService _locService;

    public EventService(EventRepository eventRepository, UserRelationRepository userRelationRepository, EventRelationService eventRelationService, LocationService locationService)
    {
        _eventRepo = eventRepository;
        _userRelRepo = userRelationRepository;
        _eventRelService = eventRelationService;
        _locService = locationService;
    }

    public async Task<Event?> GetEventByID(int eventId)
    {        
        return await _eventRepo.GetEventByID(eventId);
    }

    public async Task<ICollection<Event>> GetEventsInCity(string city)
    {
        return await _eventRepo.GetEventsInCity(city);
    }

    public async Task<ICollection<Event>?> GetUserFriendEvents(string userId)
    {
        ICollection<User?> friends = await _userRelRepo.GetUserFriends(userId);

        if (friends.Count.Equals(0))
        {
            return new Collection<Event>();
        }

        List<string> userIds = friends
            .Select(u => u.UserID).ToList();

        return await _eventRepo.GetUserFriendEvents(userIds);
    }

    public async Task<ICollection<Event>> GetUserEventsByVisibility(string visibility)
    {
        return await _eventRepo.GetUserEventsByVisibility(visibility);
    }

    public async Task<Event?> CreateEvent(Event newEvent, string creatorUserId)
    {

        if (newEvent == null)
        {
            throw new ArgumentNullException($"Cannot create empty event! (EventService)");
        }

        await _eventRepo.CreateEvent(newEvent);
        await _eventRelService.CreateEventRelation(newEvent.EventID, creatorUserId, "JOINED", "CREATOR");

        return newEvent;
    }

    public async Task<Event> UpdateEvent(int eventId, Event toUpdate)
    {
        Event? oldEvent = await _eventRepo.GetEventByID(eventId);

        if (toUpdate == null)
        {
            throw new ArgumentNullException($"Cannot create empty event! (EventService)");
        }

        if (oldEvent == null)
        {
            throw new KeyNotFoundException($"Event with eventID: {eventId}, does not exist! (EventService)");
        }
    
       return await _eventRepo.UpdateEvent(oldEvent, toUpdate);
    }

    public async Task DeleteEvent(int eventId)
    {   
        Event? eventToDelete = await _eventRepo.GetEventByID(eventId);
        
        if(eventToDelete == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, was not found!");
        }

        await _eventRepo.DeleteEvent(eventToDelete);
    }
}