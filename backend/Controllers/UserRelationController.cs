using Microsoft.AspNetCore.Mvc;
using System.Security;
using Models;
using Interfaces;
using Data;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Controllers;

[ApiController]
[Route("api/userrelation")]
public class UserRelationController : ControllerBase
{
    public readonly IUserRelationService _urService;

    public UserRelationController(IUserRelationService urService, AppDbContext context)
    {
        _urService = urService;
    }

    [HttpGet]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<UserRelation>> GetUserRelation([FromQuery] string otherUserId) {
        otherUserId = SecurityElement.Escape(otherUserId);
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            var result = await _urService.GetUserRelation(userIdClaim, otherUserId);
            return Ok(result);
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


    [HttpPost]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<UserRelation>> CreateUserRelation([FromBody] UserRelationDTO dto)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        string? otherUserId = SecurityElement.Escape(dto.OtherUserId);
        string? type = SecurityElement.Escape(dto.Type.ToString());

        try
        { 
            var result = await _urService.CreateUserRelation(userIdClaim, otherUserId, type);
            return Ok(result);
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
    public async Task<ActionResult<UserRelation>> UpdateUserRelationType([FromBody] UserRelationDTO dto)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        // flag
        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        string? otherUserId = SecurityElement.Escape(dto.OtherUserId);
        string? type = SecurityElement.Escape(dto.Type.ToString());

        try
        {
            var result = await _urService.UpdateUserRelationType(userIdClaim, otherUserId, type);
            return Ok(result);
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

    [HttpDelete("{otherUserId}")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> DeleteUserRelation(string otherUserId)
    {
        otherUserId = SecurityElement.Escape(otherUserId);
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if (userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            await _urService.DeleteUserRelation(userIdClaim, otherUserId);
            return Ok();
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
