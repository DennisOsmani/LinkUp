using System.Data;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers;

[ApiController]
[Route("api/event")]
public class EventController : ControllerBase
{

    public readonly IEventService _eventService;

    public EventController(IEventService eventService) {
        _eventService = eventService;
    }


    [HttpPost("create")]
    public async Task<ActionResult> CreateEvent([FromBody] Event newEvent, [FromQuery] string creatorUserId)
    {
        try 
        {
            var eventt = await _eventService.CreateEvent(newEvent, creatorUserId);
            return Ok(eventt);
        } 
        catch(InvalidOperationException e) 
        {
            return BadRequest(e.Message);
        }
        catch(KeyNotFoundException e) 
        {
            return NotFound(e.Message);
        }
        catch(Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteEvent(int eventId)
    {
        try 
        {
          await _eventService.DeleteEvent(eventId);
          return NoContent();
        } 
        catch(InvalidOperationException e) 
        {
            return BadRequest(e.Message);
        }
        catch(KeyNotFoundException e) 
        {
            return NotFound(e.Message);
        }
        catch(Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("{eventId}")]
    public async Task<ActionResult> GetEventByID(int eventId)
    {
        try 
        {
            var eventt = await _eventService.GetEventByID(eventId); 
            return Ok(eventt);
        } 
        catch(InvalidOperationException e) 
        {
            return BadRequest(e.Message);
        }
        catch(KeyNotFoundException e) 
        {
            return NotFound(e.Message);
        }
        catch(Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("city/{city}")]
    public async Task<ActionResult> GetEventsInCity(string city)
    {
         try 
        {
            var events = await _eventService.GetEventsInCity(city);
            return Ok(events);
        } 
        catch(InvalidOperationException e) 
        {
            return BadRequest(e.Message);
        }
        catch(Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("visibility/{visibility}")]
    public async Task<ActionResult> GetUserEventsByVisibility(string visibility)
    {
         try 
        {
            var events = await _eventService.GetUserEventsByVisibility(visibility);
            return Ok(events);
        } 
        catch(InvalidOperationException e) 
        {
            return BadRequest(e.Message);
        }
        catch(Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("eventfriends/{userId}")]
    public async Task<ActionResult> GetUserFriendEvents(string userId)
    {
        try 
        {
            var friendEvents = await _eventService.GetUserFriendEvents(userId);
            return Ok(friendEvents);
        } 
        catch(InvalidOperationException e) 
        {
            return BadRequest(e.Message);
        }
        catch(KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch(Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPut]
    public async Task<ActionResult> UpdateEvent([FromBody] Event updatedEvent)
    {
        try 
        {
            Event evt = await _eventService.UpdateEvent(updatedEvent);
            return Ok(evt);
        } 
        catch(InvalidOperationException e) 
        {
            return BadRequest(e.Message);
        }
        catch(KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch(Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}