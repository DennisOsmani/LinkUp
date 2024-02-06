
using Repositories;
using Interfaces;
using Models;
<<<<<<< HEAD
using System.Collections.ObjectModel;
using Enums;
=======
>>>>>>> dc13937385c7b77bbf7e764598f1d2ed2a44a5a0

namespace Services;

public class EventService : IEventService
{

    public readonly EventRepository _eventRepo;
<<<<<<< HEAD
    public readonly UserRelationRepository _userRelRepo;
    public readonly EventRelationRepository _eventRelRepo;
    public readonly UserRepository _userRepo;

    public EventService(EventRepository eventRepository, UserRelationRepository userRelationRepository, EventRelationRepository eventRelRepo, UserRepository userRepo)
    {
        _eventRepo = eventRepository;
        _userRelRepo = userRelationRepository;
        _eventRelRepo = eventRelRepo;
        _userRepo = userRepo;
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

    // Refaktoreres ? </3
    public async Task<Event?> CreateEvent(Event newEvent, string creatorUserId)
    {

        if (newEvent == null)
        {
            throw new ArgumentNullException($"Cannot create empty event! (EventService)");
        }

        await _eventRepo.CreateEvent(newEvent);

        Event? eventt = await _eventRepo.GetEventByID(newEvent.EventID);
        User? user = await _userRepo.GetUserByID(creatorUserId);
        
        if(eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {newEvent.EventID}, does not exist! (EventService)");
        }   

        if(user == null)
        {
            throw new KeyNotFoundException($"User with ID: {creatorUserId}, does not exist! (EventService)");
        }

        EventRelation eventRelation = new EventRelation(newEvent.EventID, eventt, creatorUserId, EventRelationParticipation.JOINED, EventRole.CREATOR);

        await _eventRelRepo.CreateEventRelation(eventRelation);

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
=======

    public EventService(EventRepository eventRepository)
    {
        _eventRepo = eventRepository;
    }

    public Task<ICollection<Event>?> GetUserFriendEvents(string userId)
    {
        return null;
    }

    public Task<ICollection<Event>?> GetEventsInCity(string city)
    {
        return null;
    }

    public async Task<Event?> GetEventByID(int eventId)
    {
        /*event = await _eventRepo.
        
        return await _eventRepo.GetEventByID(eventId);*/
        return null; 
    }

    public Task<ICollection<Event>?> GetUserEventsByType(string type)
    {
        return null;
    }


    public Task<Event?> CreateEvent(Event newEvent, string creatorUserId)
    {
        // Set user to CREATOR 
        return null;
    }

    public async Task<Event?> UpdateEvent(Event updatedEvent)
    {
        Event? eToUpdate = await _eventRepo.GetEventByID(updatedEvent.EventID);

        if (eToUpdate == null) {
            return null;
        }

       return await _eventRepo.UpdateEvent(updatedEvent, eToUpdate);
    }

    public Task<Event?> UpdateEventLocation(int eventId, Location location)
    {
        return null;
>>>>>>> dc13937385c7b77bbf7e764598f1d2ed2a44a5a0
    }

    public async Task DeleteEvent(int eventId)
    {   
        Event? eventToDelete = await _eventRepo.GetEventByID(eventId);
<<<<<<< HEAD
        
        if(eventToDelete == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, was not found!");
        }

        await _eventRepo.DeleteEvent(eventToDelete);
=======

        if (eventToDelete != null) {
            await _eventRepo.DeleteEvent(eventToDelete.EventID);
            Console.WriteLine("Deleted Event with id: " + eventId);
        }
>>>>>>> dc13937385c7b77bbf7e764598f1d2ed2a44a5a0
    }
}