using System.Security;
using System.Security.Claims;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Controllers;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("getuser")]
    public async Task<ActionResult<User>> GetUser()
    {
        // Retrieve userId from the claims
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
        
        Console.WriteLine("Claims received:");
        foreach (var claim in User.Claims)
        {
            Console.WriteLine($"{claim.Type}: {claim.Value}");
        }

        if(userIdClaim == null)
        {
            return Unauthorized("No user ID claim present in token.");
        }
        
        try
        {
            string escapedUserId = SecurityElement.Escape(userIdClaim);
            User? user = await _userService.GetUser(escapedUserId);
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

    [HttpPost]
    public async Task<ActionResult> CreateUser([FromBody] User user)
    {
        try
        {
            await _userService.CreateUser(user);
            return CreatedAtAction(nameof(GetUser), new { userId = user.UserID }, user);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut("user/update")]
    public async Task<ActionResult<User>> UpdateUser([FromBody] User user)
    {
        try
        {
            string escapedUserId = SecurityElement.Escape(user.UserID);
            User? updatedUser = await _userService.UpdateUser(escapedUserId, user);
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

    [HttpDelete("user/delete")]
    public async Task<ActionResult> DeleteUser([FromBody] string userId)
    {
        try
        {
            string escapedUserId = SecurityElement.Escape(userId);
            await _userService.DeleteUser(escapedUserId);
            return NoContent();
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

    [HttpGet("event/{eventId}")]
    public async Task<ActionResult<ICollection<User>>> GetUsersFromEvent(int eventId)
    {
        try
        {
            var users = await _userService.GetUsersFromEvent(eventId);
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