using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for updating UserRelations
/// </summary>
public interface IUserRelationService
{
    /// <summary>
    /// Get a UserRelation
    /// </summary>
    /// <param name="userId">The User logged in</param>
    /// <param name="otherUserId">The other User we want to get the relation of with logged in user</param>
    /// <returns>The UserRelation</returns>
    Task<UserRelation> GetUserRelation(string userId, string otherUserId);

    /// <summary>
    /// Creates a UserRelations Type.
    /// </summary>
    /// <param name="userId">The User logged in</param>
    /// <param name="otherUserId">The other User we want to create a relation to</param>
    /// <param name="type">The Type we want the relation to be</param>
    /// <returns>The created UserRelation</returns>
    Task<UserRelation> CreateUserRelation(string userId, string otherUserId, string type);
    // HER MÅ DET MULIGENS OPPRETTES EN LYTTER SOM FETCHER DATA NÅR DET KOMMER NYE ENTRIES I DATABASEN (GetUserRelations)

    /// <summary>
    /// Updates a UserRelations Type.
    /// </summary>
    /// <param name="userId">The User logged in</param>
    /// <param name="otherUserId">The other User we have a relation to</param>
    /// <param name="type">The Type we want to update the UserRelation to</param>
    /// <returns>The updated UserRelation</returns>
    Task<UserRelation> UpdateUserRelationType(string userId, string otherUserId, string type);

    /// <summary>
    /// Deletes a UserRelation.
    /// </summary>
    /// <param name="userRelationId">Id for the UserRelation</param>
    Task DeleteUserRelation(string userId, string otherUserId);

    /// <summary>
    /// Checks if there is a userRelation, if there is it updates it to Friends, else it returns
    /// </summary>
    /// <param name="userId">The User logged in</param>
    /// <param name="otherUserId">The other User we want to check the relation of with logged in user</param>
    /// <returns>true or false</returns>

    Task<UserRelation> IsPendingFriendRequest(string userId, string otherUserId);
}