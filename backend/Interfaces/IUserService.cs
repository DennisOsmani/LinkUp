using Microsoft.AspNetCore.Mvc;
using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for all operations on Users, and fetching Users.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Fetches a list of Users where the UserRelations type is set to Friends.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Users</returns>
    Task<List<User>> GetUserFriends(string userId);

    /// <summary>
    /// Fetches a User by a given id.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A User</returns>
    Task<User> GetUser(string userId);

    /// <summary>
    /// Fetches a list of User based on a search string for their names.
    /// </summary>
    /// <param name="fullName"></param>
    /// <returns>A list of Users</returns>
    Task<List<User>> SearchUsers(string fullName);

    /// <summary>
    /// Updates a User.
    /// </summary>
    /// <param name="user"></param>
    /// <returns>Updated User</returns>
    Task<User> UpdateUser(User user);

    /// <summary>
    /// Deletes a User.
    /// </summary>
    /// <param name="userId"></param>
    Task DeleteUser(string userId);

    /// <summary>
    /// Fetches a list of Users that have joined a event, by the event id.
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns>A list of Users</returns>
    Task<List<User>> GetUsersFromEvent(string eventId);   // Maybe just use GetEvent, if the event returns a list of users in its own object.
}