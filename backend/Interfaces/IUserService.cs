using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for all operations on Users, and fetching Users.
/// </summary>
public interface IUserService
{
    Task<User?> FindByEmailAsync(string email);

    /// <summary>
    /// Fetches a User by a given id.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A User</returns>
    Task<User?> GetUser(string userId);

    /// <summary>
    /// Creates a new user and saves it in the database
    /// </summary>
    /// <param name="user"></param>
    Task CreateUser(User user);

    /// <summary>
    /// Updates a User.
    /// </summary>
    /// <param name="user"></param>
    /// <returns>Updated User</returns>
    Task<User?> UpdateUser(string userId, User updatedUser);

    /// <summary>
    /// Deletes a User.
    /// </summary>
    /// <param name="userId"></param>
    Task DeleteUser(string userId);

    /// <summary>
    /// Fetches a list of User based on a search string for their names.
    /// </summary>
    /// <param name="fullName"></param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User>> SearchUsers(string searchString);

    /// <summary>
    /// Fetches a list of Users that have joined a event, by the event id.
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User>> GetUsersFromEvent(int eventId);   // Maybe just use GetEvent, if the event returns a list of users in its own object.

    /// <summary>
    /// Fetches a list of Users that is friends with the user logged in.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User?>> GetUserFriends(string userId);
}