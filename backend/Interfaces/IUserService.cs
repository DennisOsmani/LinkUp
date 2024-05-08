using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for all data manipulation on the Users table.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Tries to fetch a user by a given email.
    /// </summary>
    /// <param name="email">A users email address</param>
    /// <returns>A User or null if the email does not exist</returns>
    Task<User?> FindByEmailAsync(string email);

    /// <summary>
    /// Tries to fetch a User by a given id.
    /// </summary>
    /// <param name="userId">A users id</param>
    /// <returns>A User or null if the userId does not exist</returns>
    Task<User?> GetUser(string userId);

    /// <summary>
    /// Creates a new user and saves it.
    /// </summary>
    /// <param name="user">The user object to store</param>
    Task CreateUser(User user);

    /// <summary>
    /// Updates a user based on a updated user object. The users id stays the same.
    /// </summary>
    /// <param name="userId">The user to be updated</param>
    /// <param name="updatedUser">The user object containing the updated values</param>
    /// <returns>The updated User</returns>
    Task<User?> UpdateUser(string userId, User updatedUser);

    /// <summary>
    /// Deletes a user by the users id
    /// </summary>
    /// <param name="userId">The users id</param>
    Task DeleteUser(string userId);

    /// <summary>
    /// Fetches a list of User based on a search string for their names, 
    /// and removes all users that have blocked the user trying to search.
    /// </summary>
    /// <param name="searchString">The string the user are searching for</param>
    /// <param name="userId">The users id</param>
    /// <returns>A list of user objects matching the search</returns>
    Task<ICollection<User>> SearchUsers(string searchString, string userId);

    /// <summary>
    /// Fetches a list of Users that a relation for a given event id.
    /// </summary>
    /// <param name="eventId"></param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User>> GetUsersFromEvent(int eventId);

    /// <summary>
    /// Fetches a list of Users that are friends with the given user id. This means that there is a UserRelation with the UserRelationType FRIENDS.
    /// </summary>
    /// <param name="userId">The user we are fething the friends for</param>
    /// <returns>A list of Users or a empty collection if the user has no friends</returns>
    Task<ICollection<User?>> GetUserFriends(string userId);

    /// <summary>
    /// Fetches a list of users that the user with the given user id has sent pending friend requests to.
    /// </summary>
    /// <param name="userId">The user that has sent the requests</param>
    /// <returns>A list of Users or a empty collection if the user has not sent any friend requsts</returns>
    Task<ICollection<User?>> GetPendingFriendRequests(string userId);

    /// <summary>
    /// Fetches a list of users that have sent friend requests to the user with the given user id.
    /// </summary>
    /// <param name="userId">The user we are fetching data for</param>
    /// <returns>A list of Users or a empty collection if the user has gotten no friend requests</returns>
    Task<ICollection<User?>> GetUserFriendRequests(string userId);

    /// <summary>
    /// Fetches a list of users that have blocked the user with the given id.
    /// </summary>
    /// <param name="userId">The user we are fetching data for</param>
    /// <returns>A list of Users or a empty collection if the user has gotten no blocked relations</returns>
    Task<ICollection<User?>> GetUserBlocks(string userId);

    /// <summary>
    /// Gets the friends for a given user that have no relations to the given event.
    /// </summary>
    /// <param name="userId">The user we are fetching data for</param>
    /// <param name="eventId">The event we want users not invited for</param>
    /// <returns>A list of Users</returns>
    Task<ICollection<User>> GetFriendsNotInvited(string userId, int eventId);
}
