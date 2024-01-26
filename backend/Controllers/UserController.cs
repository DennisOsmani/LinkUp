using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Interfaces;
using Models;

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

    [HttpGet("getuser")]
    public async Task<ActionResult<User>> GetUser([FromQuery] string userId)
    {
        try
        {
            User? user = await _userService.GetUser(userId);
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
    public async Task<ActionResult> CreateUser(User user)
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

    [HttpPut("updateuser")]
    public async Task<ActionResult<User>> UpdateUser([FromQuery] string userId, User user)
    {
        try
        {
            User? updatedUser = await _userService.UpdateUser(userId, user);
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