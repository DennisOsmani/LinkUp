namespace Repositories;
using Data;
using Models;
using Microsoft.EntityFrameworkCore;
using Interfaces;
using System.Text;
using Enums;


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
        return await _context.Events.Where(e => e.Location.City == city).ToListAsync();
    }

    public async Task<ICollection<Event>?> GetUserEventsByType(string type) 
    {
        return await _context.Events.Where(e => e.Visibility == StringToVisibilityEnum(type)).ToListAsync();
    }

    public async Task<ICollection<Event>> GetUserFriendEvents(string userId) 
    {
        // UserRelation friends = await _context.UserRelations.Where(u => u.Type == UserRelationType.FRIENDS).; 
        
        return await _context.Events.Where(e => e.CreatorUserID == userId && e.Visibility == Visibility.FRIENDS).ToListAsync();
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

     public async Task<Event?> UpdateEventLocation(int eventId, Location newLocation)
    {
        Event? eToUpdate = await _context.Events.FindAsync(eventId);

        eToUpdate.Location.Address = newLocation.Address;
        eToUpdate.Location.Postalcode = newLocation.Postalcode;
        eToUpdate.Location.City = newLocation.City;
        eToUpdate.Location.Country = newLocation.Country;

        await _context.SaveChangesAsync();
        return eToUpdate;

    }

     public async Task DeleteEvent(int eventId)
    {
        Event? deleteEvent = await _context.Events.FindAsync(eventId);
        
        _context.Events.Remove(deleteEvent);
        await _context.SaveChangesAsync();
    }

    // Lage en switch for ENUM til strings
    public Visibility StringToVisibilityEnum(string type)
    {
        Visibility eventVisibility;

        switch(type)
        {
            case "PUBLIC":
                eventVisibility = Visibility.PUBLIC;
                break;
            case "PRIVATE":
                eventVisibility = Visibility.PRIVATE;
                break;
            case "FRIENDS":
                eventVisibility = Visibility.FRIENDS;
                break;
            default:
                eventVisibility = Visibility.PRIVATE;
                break;
        }
        return eventVisibility;
    }
}