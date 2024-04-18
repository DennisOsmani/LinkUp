using Enums;
using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for updating EventRelations
/// </summary>
public interface IEventRelationService
{
    /// <summary>
    /// Retreives an eventrelation based on the params
    /// </summary>
    /// <param name="eventId">Id of event</param>
    /// <param name="userId">Id of user</param>
    /// <returns>The eventrelation that is found</returns>
    Task<EventRelation> GetEventRelation(int eventId, string userId);

    /// <summary>
    /// Updates a EventRelations Role.
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="role">The Users new Role in the EventRelation</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationRole(int eventId, string userId, string role);

    /// <summary>
    /// Updates a EventRealtions Participation.
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="participation">The Participation we want to update the EventRelation to</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationParticipation(int eventId, string userId, string participation);

    /// <summary>
    /// Takes in a eventRelation object and tries to store it in the database.
    /// </summary>
    /// <param name="eventRelation">To be created</param>
    /// <returns>The created eventrelation</returns>
    Task<EventRelation> JoinOpenEvent(EventRelation eventRelation);

    /// <summary>
    /// Checks that the user trying to get all users in a event have joined that event
    /// </summary>
    /// <param name="eventId,">The event</param>
    /// <param name="userId,">User to check have joined</param>
    /// <returns>True if joined</returns>
    Task<bool> HaveUserJoinedEvent(int eventId, string userId);

    /// <summary>
    /// Checks that the user trying to update a role is CREATOR or HOST
    /// </summary>
    /// <param name="eventId,">The event</param>
    /// <param name="userId,">User to check if have access</param>
    /// <returns>True if joined</returns>
    Task<bool> CanUserUpdateRoleInEvent(int eventId, string userId);

    /// <summary>
    /// Deletes a user from a given event. Only event Creators or Hosts can perform this action.
    /// </summary>
    /// <param name="eventId">The event we want to delete a user from</param>
    /// <param name="userId">The user we want to delete</param>
    Task RemoveUserFromEvent(int eventId, string userId);

    /// <summary>
    /// Chekcs if a user is Host or Creator for a given event.
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="userId"></param>
    /// <returns>True if conditions met, else false</returns>
    Task<bool> IsUserHostOrCreator(int eventId, string userId);

    /// <summary>
    /// Invites a list of user to a event 
    /// </summary>
    /// <param name="userIds"></param>
    /// <param name="eventId"></param>
    Task InviteUsersForEvent(ICollection<string> userIds, int eventId);
}
