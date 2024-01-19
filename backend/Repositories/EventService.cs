namespace Services;

using Repositories;
using Interfaces;
using Models;
using System.Threading.Tasks;
using System.Collections.Generic;

public class EventService : IEventService
{

    public readonly EventRepository _eventRepo;
    // eventrealtionRepo also

    public EventService(EventRepository eventRepository) {
        this._eventRepo = eventRepository;
    }

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

    public Task<Event?> GetEventByID(string eventId)
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