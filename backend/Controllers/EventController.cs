using System.Security;
using System.Security.Claims;
using Enums;
using Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using DTOs;

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
    public async Task<ActionResult<Event>> GetEventByID(int eventId)
    {
        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var userRoleClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

        try
        {
            if (userRoleClaims == Role.SUPERADMIN.ToString() || await _eventService.CanUserViewEvent(eventId, userIdClaims))
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
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetEventsInCity(string city)
    {
        city = SecurityElement.Escape(city);
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in JWT");
        }
        try
        {
            var events = await _eventService.GetEventsInCity(city, userIdClaim);
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

    [HttpGet("host")]
    [AllowAnonymous]
    public async Task<ActionResult> GetHostForEvent(int eventId)
    {
        try
        {
            var user = await _eventService.GetHostForEvent(eventId);
            return Ok(user);
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


    [HttpGet("friends")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetUserFriendEvents()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in JWT");
        }

        try
        {
            var friendEvents = await _eventService.GetUserFriendEvents(userIdClaim);
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

    [HttpGet("invites")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetUserEventInvites()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in JWT");
        }

        try
        {
            var eventInvites = await _eventService.GetUserEventInvites(userIdClaim);
            return Ok(eventInvites);
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

    [HttpGet("joined")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetUserJoinedEvents()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in JWT");
        }

        try
        {
            var joinedEvents = await _eventService.GetUserJoinedEvents(userIdClaim);
            return Ok(joinedEvents);
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

    [HttpPost("create")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<int>> CreateEvent([FromBody] Event newEvent)
    {
        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaims == null)
        {
            return Unauthorized("No user ID claim present in token (EventController)");
        }

        try
        {
            var eventt = await _eventService.CreateEvent(newEvent, userIdClaims);
            return Ok(eventt?.EventID);
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
    public async Task<ActionResult<Event>> UpdateEvent([FromBody] Event updatedEvent)
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

    [HttpDelete("{eventId}")]
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


    [HttpGet("eventrelations/{eventId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> GetEventRelationsFromEvent(int eventId)
    {
        try
        {
            ICollection<UserWithEventParticipationDTO> eventRelations = await _eventService.GetEventRelationsFromEvent(eventId);
            return Ok(eventRelations);
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
