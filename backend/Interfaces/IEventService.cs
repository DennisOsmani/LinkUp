using Microsoft.AspNetCore.Mvc;
using Models;

/// <summary>
/// Service Interface for all operations on Events, and fetching Events.
/// </summary>
namespace Interfaces;

public interface IEventService
{
    /// <summary>
    /// Fetches a list of Events where the user has the UserRelation Friends to the creator and visibility set to friends.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event>?> GetUserFriendEvents(string userId);

    /// <summary>
    /// Fetches a list of Events based on what city you are in.
    /// </summary>
    /// <param name="city"></param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event>?> GetEventsInCity(string city);

    /// <summary>
    /// Fetches a Event by a given id.
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns>A Event</returns>
    Task<Event?> GetEvent(string eventId); // Maybe also fetch a list of users in the event

    /// <summary>
    /// Fetches a list of Events based on what type the EventRelation is.
    /// </summary>
    /// <param name="type">JOINED, DECLINED, PENDING, BAILED</param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event>?> GetUserEventsByType(string type);

    /// <summary>
    /// Creates a new Event.
    /// </summary>
    /// <param name="newEvent">Event Object</param>
    /// <returns>Newly created Event<returns>
    Task<Event?> CreateEvent(Event newEvent);

    /// <summary>
    /// Updates a Event.
    /// </summary>
    /// <param name="updatedEvent">Event Object</param>
    /// <returns>Updated Event<returns> 
    Task<Event?> UpdateEvent(Event updatedEvent);

    /// <summary>
    /// Updates.
    /// </summary>
    /// <param name="updatedEvent">EventObject</param>
    /// <returns>Updated Event</returns>
    Task<Event?> UpdateEventLocation(string eventId, Location location);

    /// <summary>
    /// Deletes a Event.
    /// </summary>
    /// <param name="eventId"></param>
    Task DeleteEvent(string eventId);
}