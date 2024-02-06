using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using System.Security;

namespace Controllers;

[ApiController]
[Route("api/eventrelation")]
public class EventRelationController : ControllerBase
{
    public readonly EventRelationService _erService;

    public EventRelationController(EventRelationService erService)
    {
        _erService = erService;
    }

    [HttpGet("role")]
    public async Task<ActionResult<ICollection<EventRelation>>> GetEventRelationByRole(int eventId, string role)
    {
        string escapedRole = SecurityElement.Escape(role);

        try
        {
            ICollection<EventRelation> eventRelations = await _erService.GetEventRelationsByRole(eventId, escapedRole);
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

    [HttpGet("participation")]
    public async Task<ActionResult<ICollection<EventRelation>>> GetEventRelationByParticipation(int eventId, string participation)
    {
        string escapedParticipation = SecurityElement.Escape(participation);

        try
        {
            ICollection<EventRelation> eventRelations = await _erService.GetEventRelationsByParticipation(eventId, escapedParticipation);
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