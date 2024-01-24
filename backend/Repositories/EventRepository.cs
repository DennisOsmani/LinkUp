namespace Repositories;
using Data;
using Models;
using Microsoft.EntityFrameworkCore;
using Interfaces;
using System.Text;
using Enums;
using Services;


/// <summary>
/// Repository for handling Event updates and manipulation to Event table.
/// </summary>
public class EventRepository
{
    public readonly AppDbContext _context;
    public readonly UserRelationRepository _userRelRepo;

    public readonly EventRelationService _eventRelService;

    public EventRepository(AppDbContext context, UserRelationRepository userRelationRepository, EventRelationService eventRelationService) 
    {
        this._context = context;
        this._userRelRepo = userRelationRepository;
        this._eventRelService = eventRelationService;
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

    public async Task<ICollection<Event?>> GetUserFriendEvents(string userId) 
    {
        // Get a list of all the users friends
        ICollection<User?> friends = await _userRelRepo.GetUserFriends(userId);
        
        if (friends == null || friends.Count.Equals(0)) {
            return new List<Event>();
        }
        
        // Get a list of evry friends userID
        List<String> userIds = friends.Select(u => u.UserID).ToList();

        // Get all the events from the creators list where the visibility is FRIENDS
        
        return await _context.EventRelations
            .Where(
                er => userIds.Contains(er.UserID) 
                && er.EventRole == EventRole.CREATOR)
            .Select(er => er.Event)
            .Where(e => e.Visibility == Visibility.FRIENDS)
            .ToListAsync(); 
    }

    public async Task<Event?> CreateEvent(Event newEvent)
    {
        _context.Events.Add(newEvent);
        await _context.SaveChangesAsync();
        return newEvent;
    }

     public async Task<Event?> UpdateEvent(Event newEvent, Event oldEvent)
    {
        oldEvent.CreatorUserID = newEvent.CreatorUserID;
        oldEvent.EventName = newEvent.EventName;
        oldEvent.EventDescription = newEvent.EventDescription;
        oldEvent.EventDateTimeStart = newEvent.EventDateTimeStart;
        oldEvent.EventDateTimeEnd = newEvent.EventDateTimeEnd;
        oldEvent.Visibility = newEvent.Visibility;
        oldEvent.InviteURL = newEvent.InviteURL;
        oldEvent.FrontImage = newEvent.FrontImage;
        oldEvent.MinCapacity = newEvent.MinCapacity;
        oldEvent.MaxCapacity = newEvent.MaxCapacity;
        oldEvent.Location = newEvent.Location;

        await _context.SaveChangesAsync();
        return oldEvent;
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