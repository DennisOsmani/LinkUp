
using Repositories;
using Interfaces;
using Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Services;

public class EventService(EventRepository eventRepository) : IEventService
{

    public readonly EventRepository _eventRepo = eventRepository;

    public Task<Event?> CreateEvent(Event newEvent, string creatorUserId)
    {
        // Set user to CREATOR 
    }

    public async Task DeleteEvent(int eventId)
    {   
        Event? eventToDelete = await _eventRepo.GetEventByID(eventId);

        if (eventToDelete != null) {
            await _eventRepo.DeleteEvent(eventToDelete.EventID);
            Console.WriteLine("Deleted Event with id: " + eventId);
        }
    }

    public async Task<Event?> GetEventByID(int eventId)
    {
    event = await _eventRepo.
        
        return await _eventRepo.GetEventByID(eventId);
    }

     public Task<ICollection<Event>?> GetUserFriendEvents(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Event>?> GetEventsInCity(string city)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Event>?> GetUserEventsByType(string type)
    {
        throw new NotImplementedException();
    }

    public Task<Event?> UpdateEvent(Event updatedEvent)
    {
        throw new NotImplementedException();
    }

    public Task<Event?> UpdateEventLocation(string eventId, Location location)
    {
        throw new NotImplementedException();
    }

    public Task DeleteEvent(string eventId)
    {
        throw new NotImplementedException();
    }


    public Task<ICollection<Event>?> GetEventsInCity(string city)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Event>?> GetUserEventsByType(string type)
    {
        throw new NotImplementedException();
    }

    public Task<ICollection<Event>?> GetUserFriendEvents(string userId)
    {
        throw new NotImplementedException();
    }

    public async Task<Event?> UpdateEvent(Event updatedEvent)
    {
        Event? eToUpdate = await _eventRepo.GetEventByID(updatedEvent.EventID);

        if (eToUpdate == null) {
            return null;
        }

       return await _eventRepo.UpdateEvent(updatedEvent, eToUpdate);
    }

    public Task<Event?> UpdateEventLocation(string eventId, Location location)
    {
        throw new NotImplementedException();
    }
}