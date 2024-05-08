using Enums;
using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for all data manipulation on the EventRelations table.
/// </summary>
public interface IEventRelationService
{
    /// <summary>
    /// Retreives an eventrelation by a given user id, and a given event id.
    /// </summary>
    /// <param name="eventId">Id of event</param>
    /// <param name="userId">Id of user</param>
    /// <returns>The eventrelation existing, or no relation</returns>
    Task<EventRelation> GetEventRelation(int eventId, string userId);

    /// <summary>
    /// Updates a EventRelations Role based on a role string (CREATOR, HOST, etc.)
    /// Cannot set role to CREATOR.
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="role">The Users new Role in the EventRelation</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationRole(int eventId, string userId, string role);

    /// <summary>
    /// Updates a EventRelations Participation based on a participation string (CREATOR, HOST, etc.)
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="role">The Users new Role in the EventRelation</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationParticipation(int eventId, string userId, string participation);

    /// <summary>
    /// Allows a user to join an open event based on its visibility settings. It handles event and user validations, updates the event-user relationship, and modifies user statistics accordingly.
    /// </summary>
    /// <param name="eventRelation">An object containing the event ID and user ID attempting to join the event.</param>
    /// <returns>Returns the updated event relation object after the user has joined the event.</returns>
    Task<EventRelation> JoinOpenEvent(EventRelation eventRelation);

    /// <summary>
    /// Checks if a given user has joined a given event or not.
    /// </summary>
    /// <param name="eventId">The event</param>
    /// <param name="userId">User to check have joined</param>
    /// <returns>True if joined, false if not</returns>
    Task<bool> HaveUserJoinedEvent(int eventId, string userId);

    /// <summary>
    /// Checks that the user trying to update a role is CREATOR or HOST
    /// </summary>
    /// <param name="eventId">The event</param>
    /// <param name="userId">User to check if have access</param>
    /// <returns>True if joined, false if not</returns>
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
    /// <param name="eventId">The event</param>
    /// <param name="userId">User to check if have access</param>
    /// <returns>True if conditions met, else false</returns>
    Task<bool> IsUserHostOrCreator(int eventId, string userId);

    /// <summary>
    /// Takes in a list of userIds and a event id, and creates EventRelations for each user id with the EventRelationParticipation set to PENDING and EventRole to PARTICIPANT
    /// </summary>
    /// <param name="userIds">All the user ids we want to invite</param>
    /// <param name="eventId">The event we want to invite for</param>
    Task InviteUsersForEvent(ICollection<string> userIds, int eventId);
}
