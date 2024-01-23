
using Repositories;
using Interfaces;
using Models;

namespace Services;

public class EventService : IEventService
{

    public readonly EventRepository _eventRepo;

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