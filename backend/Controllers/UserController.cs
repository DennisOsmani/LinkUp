using System.Security;
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

    [HttpGet("get")]
    public async Task<ActionResult<User>> GetUser([FromBody] string userId)
    {
        try
        {
            string escapedUserId = SecurityElement.Escape(userId);
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
    public async Task<ActionResult<ICollection<User>>> GetUsersFromEvent([FromBody] int eventId)
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