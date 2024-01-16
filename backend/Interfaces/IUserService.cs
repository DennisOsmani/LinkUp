using Microsoft.AspNetCore.Mvc;
using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for all operations on Users, and fetching Users.
/// </summary>
public interface IUserService
{
    Task<List<User>> GetUserFriends([FromQuery] string userId);

    Task<User> GetUser([FromQuery] string userId);

    Task<List<User>> SearchUsers([FromQuery] string fullName);

    Task UpdateUser([FromBody] User user);

    Task DeleteUser([FromQuery] string userId);

    Task<List<User>> GetUsersFromEvent([FromQuery] string eventId);   // Maybe just use GetEvent, if the event returns a list of users in its own object.
}