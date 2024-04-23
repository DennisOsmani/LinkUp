using Microsoft.AspNetCore.Mvc;
using Models;
using Enums;
using Interfaces;
using System.Security;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Repositories;
using DTOs;

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

    [HttpGet]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<EventRelation>> GetEventRelation(int eventId)
    {

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }
        try
        {
            var er = await _erService.GetEventRelation(eventId, userIdClaim);
            return Ok(er);
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


    [HttpPost("create/{eventId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> CreateEventRealations(int eventId, [FromBody] List<string> userIds)
    {
        try
        {
            await _erService.InviteUsersForEvent(userIds, eventId);
            return Ok("Invited all users!");
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

    [HttpGet("users/{eventId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<ICollection<User>>> GetUsersFromEvent(int eventId)
    {

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
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


    [HttpPost("join")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<EventRelation>> JoinOpenEvent(int eventId)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            EventRelation eventRelationResponse = await _erService.JoinOpenEvent(new EventRelation(eventId, userIdClaim, EventRelationParticipation.JOINED, EventRole.PARTICIPANT));
            return Ok(eventRelationResponse);
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

    [HttpPut("role")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<EventRelation>> UpdateEventRelationRole(EventRelationDTO dto)
    {
        var role = SecurityElement.Escape(dto.EventRole.ToString());

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        string escapedRole = SecurityElement.Escape(role);

        bool canUpdate = await _erService.CanUserUpdateRoleInEvent(dto.EventID, userIdClaim);
        bool userJoined = await _erService.HaveUserJoinedEvent(dto.EventID, userIdClaim);

        try
        {
            if (canUpdate && userJoined)
            {
                EventRelation eventRelation = await _erService.UpdateEventRelationRole(dto.EventID, userIdClaim, escapedRole);
                return Ok(eventRelation);
            }
            else
            {
                return Unauthorized($"No access to update the role of user or the user with ID: {userIdClaim} have not joined Event with ID: {dto.EventID}!");
            }
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

    [HttpPut("participation/{eventId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<EventRelation>> UpdateEventRelationParticipation(int eventId, [FromBody] string participation)
    {
        participation = SecurityElement.Escape(participation);
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        EventRelation? evRel = await _erRepo.GetEventRelation(eventId, userIdClaim);

        if (evRel == null)
        {
            return Unauthorized("Not possible to update non-existing eventrelation (EventRelationController)!");
        }

        try
        {
            EventRelation eventRelation = await _erService.UpdateEventRelationParticipation(eventId, userIdClaim, participation);
            return Ok(eventRelation);
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
    public async Task<ActionResult> RemoveUserFromEvent([FromQuery] int eventId, [FromQuery] string? userId)
    {
        var userIdClaims = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaims == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            var eventRel = await _erService.GetEventRelation(eventId, userIdClaims);
            bool isUserHostOrCreator = await _erService.IsUserHostOrCreator(eventId, userIdClaims);
            if (!isUserHostOrCreator && eventRel == null)
            {
                return Unauthorized("User does not have permission");
            }
            if (userId == null)
            {
                await _erService.RemoveUserFromEvent(eventId, userIdClaims);
                return Ok("User removed from event successfully");
            }
            else
            {
                await _erService.RemoveUserFromEvent(eventId, userId);
                return Ok("User removed from event successfully");
            }
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
