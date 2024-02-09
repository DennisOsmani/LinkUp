using System.Data;
using System.Security;
using System.Security.Claims;
using Enums;
using Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using Models;

namespace Controllers;

[ApiController]
[Route("api/event")]
public class EventController : ControllerBase
{

    public readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }


    [HttpGet("{eventId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetEventByID(int eventId)
    {
        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var userRoleClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

        try
        {
            if (await _eventService.CanUserViewEvent(eventId, userIdClaims)
                || userRoleClaims == Role.SUPERADMIN.ToString())
            {
                var eventt = await _eventService.GetEventByID(eventId);
                return Ok(eventt);
            }
            return Unauthorized("The user Id in claims does not have access to this event");
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("city/{city}")]
    [AllowAnonymous]
    public async Task<ActionResult> GetEventsInCity(string city)
    {
        try
        {
            var events = await _eventService.GetEventsInCity(city);
            return Ok(events);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("eventfriends/{userId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetUserFriendEvents(string userId)
    {
        userId = SecurityElement.Escape(userId);

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in JWT");
        }

        try
        {
            var friendEvents = await _eventService.GetUserFriendEvents(userId);
            return Ok(friendEvents);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpGet("visibility/{visibility}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetUserEventsByVisibility(string visibility)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in JWT");
        }

        try
        {
            var events = await _eventService.GetUserEventsByVisibility(visibility);
            return Ok(events);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost("create")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> CreateEvent([FromBody] Event newEvent, [FromQuery] string creatorUserId)
    {
        creatorUserId = SecurityElement.Escape(creatorUserId);

        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaims == null)
        {
            return Unauthorized("No user ID claim present in token (EventController)");
        }

        try
        {
            var eventt = await _eventService.CreateEvent(newEvent, creatorUserId);
            return Ok(eventt);
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPut]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> UpdateEvent([FromBody] Event updatedEvent)
    {
        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var userRoleClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;


        if (userIdClaims == null)
        {
            return Unauthorized("No user ID claim present in token (EventController)");
        }

        try
        {
            if (await _eventService.CanUserUpdateEvent(updatedEvent.EventID, userIdClaims)
                || userRoleClaims == Role.SUPERADMIN.ToString())
            {
                Event evt = await _eventService.UpdateEvent(updatedEvent);
                return Ok(evt);
            }
            return Unauthorized("The user Id in claims does not have access to update this event");

        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpDelete]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> DeleteEvent(int eventId)
    {
        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var userRoleClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

        if (userIdClaims == null)
        {
            return Unauthorized("No user ID claim present in token (EventController)");
        }

        try
        {
            if (await _eventService.CanUserUpdateEvent(eventId, userIdClaims)
                || userRoleClaims == Role.SUPERADMIN.ToString())
            {
                await _eventService.DeleteEvent(eventId);
                return NoContent();
            }
            return Unauthorized("The user Id in claims does not have access to update this event");

        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}