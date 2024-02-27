using Models;

/// <summary>
/// Service Interface for all operations on Events, and fetching Events.
/// </summary>
namespace Interfaces;

public interface IEventService
{

    /// <summary>
    /// Fetches a Event by a given id.
    /// Maybe also fetch a list of users in the event
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns>A Event</returns>
    Task<Event?> GetEventByID(int eventId);

    /// <summary>
    /// Fetches a list of Events based on what city you are in.
    /// USED FOR ONE OF THE FEED TABS
    /// </summary>
    /// <param name="city"></param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event>> GetEventsInCity(string city);

    /// <summary>
    /// Fetches a list of Events where the user has the UserRelation Friends to the creator and visibility set to friends.
    /// USED FOR ONE OF THE FEED TABS
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event>?> GetUserFriendEvents(string userId);

    /// <summary>
    /// Fetches a list of Events that the user is invited to, aka status pending
    /// USED FOR ONE OF THE FEED TABS
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event>> GetUserEventInvites(string userId);

    /// <summary>
    /// Fetches a list of the Events the user has joined, aka status accepted
    /// USED FOR ONE OF THE FEED TABS
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event>> GetUserJoinedEvents(string userId);

    /// <summary>
    /// Creates a new Event and sets the userrole as CREATOR.
    /// </summary>
    /// <param name="newEvent">Event Object</param>
    /// <returns>Newly created Event<returns>
    Task<Event?> CreateEvent(Event newEvent, string creatorUserId);

    /// <summary>
    /// Updates a Event.
    /// </summary>
    /// <param name="updatedEvent">Event Object</param>
    /// <returns>Updated Event<returns> 
    Task<Event> UpdateEvent(Event updatedEvent);

    /// <summary>
    /// Deletes a Event.
    /// </summary>
    /// <param name="eventId"></param>
    Task DeleteEvent(int eventId);

    /// <summary>
    /// Checks if the logged in user should have acces to GetEvent method in EventController
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <param name="userId">Id of the relevant user</param>
    /// <returns>True if access should be given, false else<returns> 
    Task<bool> CanUserViewEvent(int eventId, string userId);

    /// <summary>
    /// Checks if the logged in user should have acces to UpdateEvent method in EventController
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <param name="userId">Id of the relevant user</param>
    /// <returns>True if permisson should be granted, false else<returns> 
    Task<bool> CanUserUpdateEvent(int eventId, string userId);

    /// <summary>
    /// Checks if the logged in user should have acces to DeleteEvent method in EventController
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <param name="userId">Id of the relevant user</param>
    /// <returns>True if permisson should be granted, false else<returns> 
    Task<bool> CanUserDeleteEvent(int eventId, string userId);
}