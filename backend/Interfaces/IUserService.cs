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
    /// Fetches a list of User based on a search string for their names, 
    /// and removes all users that have blocked the logged in user.
    /// </summary>
    /// <param name="searchString"></param>
    /// <param name="userId"=></param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User>> SearchUsers(string searchString, string userId);

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

    /// <summary>
    /// Fetches a list of Users that logged in user has sent a friend request to.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User?>> GetPendingFriendRequests(string userId);

    /// <summary>
    /// Fetches a list of Users that logged in user has got a friend request from.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User?>> GetUserFriendRequests(string userId);

    /// <summary>
    /// Fetches a list of Users that logged in user has blocked.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Users that are blocked</returns>
    Task<ICollection<User?>> GetUserBlocks(string userId);

    /// <summary>
    /// Gets the hosts friends thats not invited or has a relation to the event.
    /// User for getting people to invite for a event in frontend.
    /// </summary>
    /// <param name="userId"></param>
    /// <param name="eventId"></param>
    /// <returns>A list of Users </returns>
    Task<ICollection<User>> GetFriendsNotInvited(string userId, int eventId);
}
