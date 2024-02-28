using Microsoft.AspNetCore.Mvc;
using Models;
using Interfaces;
using System.Security;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Repositories;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace Controllers;

[ApiController]
[Route("api/eventrelation")]
public class EventRelationController : ControllerBase
{
    public readonly IEventRelationService _erService;
    public readonly IUserService _userService;
    public readonly EventRelationRepository _erRepo;

    public EventRelationController(IEventRelationService erService, IUserService userService, EventRelationRepository eventRelationRepository)
    {
        _erService = erService;
        _userService = userService;
        _erRepo = eventRelationRepository;
    }

    [HttpGet("users/{eventId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
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
                return Unauthorized($"No access to get all users in Event with ID: {eventId}!");
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
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<EventRelation>> UpdateEventRelationRole(int eventId, string userId, string role)
    {   
        userId = SecurityElement.Escape(userId);
        role = SecurityElement.Escape(role);

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        string escapedUserId = SecurityElement.Escape(userId);
        string escapedRole = SecurityElement.Escape(role);

        bool canUpdate = await _erService.CanUserUpdateRoleInEvent(eventId, userIdClaim);
        bool userJoined = await _erService.HaveUserJoinedEvent(eventId, escapedUserId);

        try
        {
            if(canUpdate && userJoined)
            {
            EventRelation eventRelation = await _erService.UpdateEventRelationRole(eventId, escapedUserId, escapedRole);
            return Ok(eventRelation);
            }
            else
            {
                return Unauthorized($"No access to update the role of user or the user with ID: {escapedUserId} have not joined Event with ID: {eventId}!");
            }
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
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<EventRelation>> UpdateEventRelationParticipation(int eventId, string participation)
    {
        participation = SecurityElement.Escape(participation);
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        string escapedUserId = SecurityElement.Escape(userIdClaim);
        string escapedParticipation = SecurityElement.Escape(participation);

        EventRelation? evRel = await _erRepo.GetEventRelation(eventId, escapedUserId);

        if (evRel == null) {
            return Unauthorized("No acsess!");
        }

        try
        {
            EventRelation eventRelation = await _erService.UpdateEventRelationParticipation(eventId, escapedUserId, escapedParticipation);
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

    [HttpDelete]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> RemoveUserFromEvent([FromQuery] int eventId,[FromQuery] string userId)
    {
        userId = SecurityElement.Escape(userId);
        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaims == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        bool isUserHostOrCreator = await _erService.IsUserHostOrCreator(eventId, userIdClaims);
        if(!isUserHostOrCreator)
        {
            return Unauthorized("User does not have permission");
        }

        try
        {
            await _erService.RemoveUserFromEvent(eventId, userId);
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
}