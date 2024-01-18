namespace Repositories;
using Data;
using Models;
using Microsoft.EntityFrameworkCore;
using Interfaces;


/// <summary>
/// Repository for handling Event updates and manipulation to Event table.
/// </summary>
public class EventRepository
{
    public readonly AppDbContext _context;

    public EventRepository(AppDbContext context) 
    {
        this._context = context;
    }

    public async Task<Event?> GetEventByID(int eventId) 
    {
        return await _context.Events.FindAsync(eventId);
    }

    public async Task<ICollection<Event>?> GetEventsInCity(string city)
    {
        return await _context.Events.Where(l => l.Location.City == city).ToListAsync();
    }

    public async Task<ICollection<Event>?> GetUserEventsByType(string type) 
    {
        return await _context.Events.Where(e => e.Visibility == type).ToListAsync();
    }

    public async Task<ICollection<Event>> GetUserFriendEvents(string userId) 
    {

    }

    public async Task<Event?> CreateEvent(Event newEvent)
    {
        _context.Events.Add(newEvent);
        await _context.SaveChangesAsync();
        return newEvent;
    }

     public async Task<Event?> UpdateEvent(Event updatedEvent, Event eventToUpdate)
    {
        eventToUpdate.CreatorUserID = updatedEvent.CreatorUserID;
        eventToUpdate.EventName = updatedEvent.EventName;
        eventToUpdate.EventDescription = updatedEvent.EventDescription;
        eventToUpdate.EventDateTimeStart = updatedEvent.EventDateTimeStart;
        eventToUpdate.EventDateTimeEnd = updatedEvent.EventDateTimeEnd;
        eventToUpdate.Visibility = updatedEvent.Visibility;
        eventToUpdate.InviteURL = updatedEvent.InviteURL;
        eventToUpdate.FrontImage = updatedEvent.FrontImage;
        eventToUpdate.MinCapacity = updatedEvent.MinCapacity;
        eventToUpdate.MaxCapacity = updatedEvent.MaxCapacity;
        eventToUpdate.Location = updatedEvent.Location;

        await _context.SaveChangesAsync();
        return eventToUpdate;
    }

     public async Task<Event?> UpdateEventLocation(string eventId, Location location)
    {

    }

     public async Task DeleteEvent(string eventId)
    {
        Event? deleteEvent = await _context.Events.FindAsync(eventId);
        
        _context.Events.Remove(deleteEvent);
        await _context.SaveChangesAsync();
    }

    // Lage en switch for ENUM til strings

}