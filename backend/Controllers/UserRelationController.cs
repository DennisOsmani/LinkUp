using Microsoft.AspNetCore.Mvc;
using System.Security;
using Models;
using Services;
using Interfaces;
using Data;
using DTOs;

namespace Controllers;

[ApiController]
[Route("api/userrelation")]
public class UserRelationController : ControllerBase
{
    public readonly IUserRelationService _urService;
    public readonly AppDbContext _context;

    public UserRelationController(IUserRelationService urService, AppDbContext context)
    {
        _urService = urService;
        _context = context;
    }

    // Only for testing
    [HttpGet]
    public async Task<ActionResult<UserRelation>> GetUserRelation([FromBody] int userRelationId)
    {
        return await _context.UserRelations.FindAsync(userRelationId) ?? throw new KeyNotFoundException($"NO USERRELATION WITH ID {userRelationId}");
    }

    [HttpPost]
    public async Task<ActionResult<UserRelation>> CreateUserRelation([FromBody] UserRelationDTO dto)
    {
        string userId = SecurityElement.Escape(dto.UserID);
        string otherUserId = SecurityElement.Escape(dto.OtherUserId);
        string type = SecurityElement.Escape(dto.Type.ToString());

        try
        {
            var result = await _urService.CreateUserRelation(userId, otherUserId, type);
            return Ok(result);
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
    public async Task<ActionResult<UserRelation>> UpdateUserRelationType([FromBody] UserRelationDTO dto)
    {
        string userId = SecurityElement.Escape(dto.UserID);
        string otherUserId = SecurityElement.Escape(dto.OtherUserId);
        string type = SecurityElement.Escape(dto.Type.ToString());

        try
        {
            var result = await  _urService.UpdateUserRelationType(userId, otherUserId, type);
            return Ok(result);
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
    public async Task<ActionResult> DeleteUserRelation(string userId, string otherUserId)
    {
        try
        {
            await _urService.DeleteUserRelation(userId, otherUserId);
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