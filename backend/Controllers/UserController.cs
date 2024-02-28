using System.Security;
using System.Security.Claims;
using Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Enums;

namespace Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<User>> GetUser([FromQuery] string? userId)
    {
        if(!string.IsNullOrEmpty(userId))
        {
            userId = SecurityElement.Escape(userId);
        }

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }
        
        try
        {
            User? user;

            if(!String.IsNullOrEmpty(userId))
            {
                user = await _userService.GetUser(userId);
                return Ok(user);
            }

            user = await _userService.GetUser(userIdClaim);
            return Ok(user);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (ArgumentNullException ex)
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

    [HttpPut("update")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<User>> UpdateUser([FromBody] User user)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            string escapedUserId = SecurityElement.Escape(user.UserID);
            User? updatedUser = await _userService.UpdateUser(userIdClaim, user);
            return Ok(updatedUser);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("delete")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult> DeleteUser([FromQuery] string? userId)
    {
        if(!string.IsNullOrEmpty(userId))
        {
            userId = SecurityElement.Escape(userId);
        }

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        var userRoleClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }

        try
        {
            if(String.IsNullOrEmpty(userId))
            {
                await _userService.DeleteUser(userIdClaim);
                return Ok($"User {userId} was deleted successfully!");
            }

            if(userRoleClaim == Role.SUPERADMIN.ToString() || userRoleClaim == Role.ADMIN.ToString())
            {
                string escapedUserId = SecurityElement.Escape(userId);
                await _userService.DeleteUser(escapedUserId);
                return NoContent();
            }

            return Unauthorized($"User {userIdClaim} does not have permission for this operation.");
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("search")]
    [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
    public async Task<ActionResult<ICollection<User>>> SearchUsers([FromQuery] string searchString)
    {
        try
        {
            string escapedSearchString = SecurityElement.Escape(searchString);
            var users = await _userService.SearchUsers(escapedSearchString);
            return Ok(users);
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
}