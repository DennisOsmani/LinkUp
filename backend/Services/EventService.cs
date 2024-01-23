
using Repositories;
using Interfaces;
using Models;
using Enums;

namespace Services;

public class EventService : IEventService
{

    public readonly EventRepository _eventRepo;
    public readonly EventRelationService _eventRelService;

    public EventService(EventRepository eventRepository, EventRelationService eventRelationService)
    {
        _eventRepo = eventRepository;
    }

    public Task<ICollection<Event>?> GetUserFriendEvents(string userId)
    {
        return null;
    }

    public async Task<ICollection<Event>?> GetEventsInCity(string city)
    {

        ICollection<Event>? events = await _eventRepo.GetEventsInCity(city);

        // reutrn a empty list if no events
        if (events == null || events.Count.Equals(0)) {
            return new List<Event>();
        }

        return events;
    }

    public async Task<Event?> GetEventByID(int eventId)
    {        
        Event? ev = await _eventRepo.GetEventByID(eventId);
        
        if (ev == null) {
            return null;
        } 
        
        return ev;
    }

    public async Task<ICollection<Event>?> GetUserEventsByType(string type)
    {
        ICollection<Event>? events = await _eventRepo.GetUserEventsByType(type);

        // reutrn a empty list if no events
        if (events == null || events.Count.Equals(0)) {
            return new List<Event>();
        }

        return events;
    }

    public async Task<Event?> CreateEvent(Event newEvent, string creatorUserId)
    {

        if (newEvent == null) {
            return null;
        }

        //Saves the new event and sets the users role in the eventrelation to CREATOR
        await _eventRelService.UpdateEventRelationRole(newEvent.EventID, creatorUserId, "CREATOR");
        return await _eventRepo.CreateEvent(newEvent);

    }

    public async Task<Event?> UpdateEvent(Event updatedEvent)
    {
        // checks if the updated event exists in the database
        Event? eToUpdate = await _eventRepo.GetEventByID(updatedEvent.EventID);

        if (eToUpdate == null) {
            return null;
        }
    
        // Takes the event in the database and updateds its info with the new updated details and returns the new event
       return await _eventRepo.UpdateEvent(updatedEvent, eToUpdate);
    }

    public async Task<Event?> UpdateEventLocation(int eventId, Location newLocation)
    {
        Event? ev = await _eventRepo.GetEventByID(eventId);

        if (ev == null) {
            return null;
        } 

        return await _eventRepo.UpdateEventLocation(eventId, newLocation);
    }

    public async Task DeleteEvent(int eventId)
    {   
        Event? eventToDelete = await _eventRepo.GetEventByID(eventId);

        if (eventToDelete != null) {
            await _eventRepo.DeleteEvent(eventToDelete.EventID);
            Console.WriteLine("Deleted Event with id: " + eventId);
        }
    }
}