using Microsoft.AspNetCore.Mvc;
using Models;

/// <summary>
/// Service Interface for all operations on Events, and fetching Events.
/// </summary>
namespace Interfaces;

public interface IEventService
{
    Task<List<Event>> GetUserFriendEvents([FromQuery] string userId);

    Task<List<Event>> GetEvetsInCity([FromQuery] string city);

    Task<Event> GetEvent([FromQuery] string eventId); // Maybe also fetch a list of users in the event

    Task<List<Event>> GetUserEventsByStatus([FromQuery] string type);

    Task CreateEvent([FromBody] Event newEvent);

    Task UpdateEvent([FromBody] Event updatedEvent);

    Task UpdateEventLocation([FromBody] Event updatedEvent);

    Task DeleteEvent([FromQuery] string eventId);
}