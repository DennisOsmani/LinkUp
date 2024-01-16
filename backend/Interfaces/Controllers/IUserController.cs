using Microsoft.AspNetCore.Mvc;
using Models;

namespace Interfaces.Controllers;

/// <summary>
/// Controller Interface for all operations on Users, and fetching Users.
/// </summary>
public interface IUserController
{
    Task<ActionResult<List<User>>> GetUserFriends([FromQuery] string userId);

    Task<ActionResult<User>> GetUser([FromQuery] string userId);

    Task<ActionResult<List<User>>> SearchUsers([FromQuery] string fullName);

    Task<ActionResult> UpdateUser([FromBody] User user);

    Task<ActionResult> DeleteUser([FromQuery] string userId);

    Task<ActionResult<List<User>>> GetUsersFromEvent([FromQuery] string eventId);   // Maybe just use GetEvent, if the event returns a list of users in its own object.
}