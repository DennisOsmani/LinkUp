using Microsoft.AspNetCore.Mvc;
using Models;

/// <summary>
/// Controller Interface for all operations on Events, and fetching Events.
/// </summary>
namespace Interfaces.Controllers;

public interface IEventController
{
    Task<ActionResult<List<Event>>> GetUserFriendEvents([FromQuery] string userId);

    Task<ActionResult<List<Event>>> GetEvetsInCity([FromQuery] string city);

    Task<ActionResult<Event>> GetEvent([FromQuery] string eventId); // Maybe also fetch a list of users in the event

    Task<ActionResult<List<Event>>> GetUserEventsByStatus([FromQuery] string type);

    Task<ActionResult> CreateEvent([FromBody] Event newEvent);

    Task<ActionResult> UpdateEvent([FromBody] Event updatedEvent);

    Task<ActionResult> UpdateEventLocation([FromBody] Event updatedEvent);

    Task<ActionResult> DeleteEvent([FromQuery] string eventId);
}