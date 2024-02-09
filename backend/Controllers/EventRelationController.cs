using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using Interfaces;
using System.Security;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Controllers;

[ApiController]
[Route("api/eventrelation")]
public class EventRelationController : ControllerBase
{
    public readonly IEventRelationService _erService;
    public readonly UserService _userService;

    public EventRelationController(IEventRelationService erService, UserService userService)
    {
        _erService = erService;
        _userService = userService;
    }

    [HttpGet("event/{eventId}")]
    [Authorize(Roles = "USER, ADMIN, SUPERADMIN")]
    public async Task<ActionResult<ICollection<User>>> GetUsersFromEvent(int eventId)
    {

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        bool userJoined = await _erService.HaveUserJoinedEvent(eventId, userIdClaim);
        try
        {
            if (userJoined) 
            {
                var users = await _userService.GetUsersFromEvent(eventId);
                return Ok(users);
            } 
            else
            {
                return Unauthorized("No access to get all users in Event!");
            } 
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }


    [HttpGet("role")]
    [Authorize(Roles = "USER, ADMIN")]
    public async Task<ActionResult<ICollection<User?>>> GetUsersFromEventByRole(int eventId, string role)
    {
        string escapedRole = SecurityElement.Escape(role);

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            ICollection<User?> users = await _erService.GetUsersFromEventByRole(eventId, escapedRole);
            return Ok(users);
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

    [HttpGet("participation")]
    public async Task<ActionResult<ICollection<EventRelation>>> GetUsersFromEventByParticipation(int eventId, string participation)
    {
        string escapedParticipation = SecurityElement.Escape(participation);

         var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            ICollection<User?> eventRelations = await _erService.GetUsersFromEventByParticipation(eventId, escapedParticipation);
            return Ok(eventRelations);
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

    /*
    [HttpPost("create")]
    public async Task<ActionResult<EventRelation>> CreateEventRelation(EventRelationDTO dto)
    {
        try
        {
            EventRelation eventRelationResponse = await _erService.CreateEventRelation(new EventRelation(dto.EventID, dto.UserID, dto.EventRelationParticipation, dto.EventRole));
            return Ok(eventRelationResponse);
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
    */

    [HttpPut("role")]
    public async Task<ActionResult<EventRelation>> UpdateEventRelationRole(int eventId, string userId, string role)
    {   
        string escapedUserId = SecurityElement.Escape(userId);
        string escapedRole = SecurityElement.Escape(role);

        try
        {
            EventRelation eventRelation = await _erService.UpdateEventRelationRole(eventId, escapedUserId, escapedRole);
            return Ok(eventRelation);
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

    [HttpPut("participation")]
    public async Task<ActionResult<EventRelation>> UpdateEventRelationParticipation(int eventId, string userId, string participation)
    {
        string escapedUserId = SecurityElement.Escape(userId);
        string escapedParticipation = SecurityElement.Escape(participation);

        try
        {
            EventRelation eventRelation = await _erService.UpdateEventRelationParticipation(eventId, escapedUserId, escapedParticipation);
            return Ok();
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