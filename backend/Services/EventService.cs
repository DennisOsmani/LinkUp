
using Repositories;
using Interfaces;
using Models;
using Enums;
using System.Collections.ObjectModel;

namespace Services;

public class EventService : IEventService
{

    public readonly EventRepository _eventRepo;
    public readonly EventRelationService _eventRelService;
    public readonly UserRelationRepository _userRelRepo;
    public readonly LocationService _locService;

    public EventService(EventRepository eventRepository, UserRelationRepository userRelationRepository, 
                        EventRelationService eventRelationService, LocationService locationService)
    {
        _eventRepo = eventRepository;
        this._userRelRepo = userRelationRepository;
        this._locService = locationService;
    }

    public async Task<ICollection<Event>?> GetUserFriendEvents(string userId)
    {
        // Get a list of all the users friends
        ICollection<User?> friends = await _userRelRepo.GetUserFriends(userId);

        if (friends == null) {
            // new List<User>();
            // Exception
        }

        // Get a list of evry friends userID
        List<String> userIds = friends.Select(u => u.UserID).ToList();

        ICollection<Event>? events = await _eventRepo.GetUserFriendEvents(userIds);

        if (events == null) {
            return new List<Event>();
            // Exception
        }
        return events;
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
        return await _eventRepo.GetEventByID(eventId);
    }

    public async Task<ICollection<Event>?> GetUserEventsByVisibility(string visibility)
    {
        ICollection<Event>? events = await _eventRepo.GetUserEventsByVisibility(visibility);

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

    public async Task<Event?> UpdateEvent(Event newEvent)
    {
        // checks if the event to update exists in the database
        Event? oldEvent = await _eventRepo.GetEventByID(newEvent.EventID);

        if (oldEvent == null) {
            return null;
        }
    
        // Takes the event in the database and updates its info with the new updated details and returns the new event
       return await _eventRepo.UpdateEvent(newEvent, oldEvent);
    }

    public async Task<Event?> UpdateEventLocation(int eventId, Location newLocation)
    {
        Event? ev = await _eventRepo.GetEventByID(eventId);

        if (ev == null) {
            return null;
        } 

        if (ev.Location == null) {
            // Exception
        }

        Location updatedLocation = await _locService.UpdateLocation(ev.Location.LocationID, newLocation);
        ev.Location = updatedLocation;

        return ev;
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