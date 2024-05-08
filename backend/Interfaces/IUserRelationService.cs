using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for all data manipulation on the UserRelations table.
/// </summary>
public interface IUserRelationService
{
    /// <summary>
    /// Gets a UserRelation between two users by the two given user ids.
    /// </summary>
    /// <param name="userId">This users id</param>
    /// <param name="otherUserId">The other User we want to get the relation of with this user</param>
    /// <returns>The UserRelation between the two</returns>
    Task<UserRelation> GetUserRelation(string userId, string otherUserId);

    /// <summary>
    /// First tries to find if there exists a UserRelation with type pending, if not it Creates a UserRelation defined by type, between two users.
    /// </summary>
    /// <param name="userId">This users id</param>
    /// <param name="otherUserId">The other User we want to create a relation to</param>
    /// <param name="type">The Type we want the relation to be (FRIENDS, BLOCKED, etc.)</param>
    /// <returns>The existing UserRelation or the new created UserRelation</returns>
    Task<UserRelation> CreateUserRelation(string userId, string otherUserId, string type);

    /// <summary>
    /// Updates a UserRelation with a new type given.
    /// </summary>
    /// <param name="userId">This users id</param>
    /// <param name="otherUserId">The other User we have a relation to</param>
    /// <param name="type">The Type we want to update the UserRelation to (FRIENDS, BLOCKED, etc.)</param>
    /// <returns>The updated UserRelation</returns>
    Task<UserRelation> UpdateUserRelationType(string userId, string otherUserId, string type);

    /// <summary>
    /// Deletes a UserRelation between two users by their given ids.
    /// </summary>
    /// <param name="userId">This users id</param>
    /// <param name="otherUserId">The other User we have a relation to</param>
    Task DeleteUserRelation(string userId, string otherUserId);

}