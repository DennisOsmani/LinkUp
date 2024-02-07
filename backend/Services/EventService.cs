
using Repositories;
using Interfaces;
using Models;
using System.Collections.ObjectModel;
using Enums;

namespace Services;

public class EventService : IEventService
{

    public readonly EventRepository _eventRepo;
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
    
    // GetMyEvents()

    // 

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
    public async Task<Event?> CreateEvent(Event newEvent)
    {

        if (newEvent == null)
        {
            throw new ArgumentNullException($"Cannot create empty event! (EventService)");
        }
        
        User? user = await _userRepo.GetUserByID(newEvent.User.UserID);

        if(user == null)
        {
            throw new KeyNotFoundException($"User with ID: {newEvent.User.UserID}, does not exist! (EventService)");
        }

        EventRelation eventRelation = new EventRelation(newEvent.EventID, newEvent.User.UserID, EventRelationParticipation.JOINED, EventRole.CREATOR);
        
        await _eventRepo.CreateEvent(newEvent);  

        await _eventRelRepo.CreateEventRelation(eventRelation);

        return newEvent;
    }

    public async Task<Event> UpdateEvent(int eventId, Event updatedEvent)
    {
        Event? oldEvent = await _eventRepo.GetEventByID(eventId);

        if (updatedEvent == null)
        {
            throw new ArgumentNullException($"Cannot create empty event! (EventService)");
        }

        if (oldEvent == null)
        {
            throw new KeyNotFoundException($"Event with eventID: {eventId}, does not exist! (EventService)");
        }
    
       return await _eventRepo.UpdateEvent(oldEvent, updatedEvent);
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