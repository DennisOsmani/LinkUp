using Microsoft.AspNetCore.Mvc;
using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for updating EventRelations
/// </summary>
public interface IEventRelationService
{
    /// <summary>
    /// Updates a EventRealtions Participation.
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="participation">The Participation we want to update the EventRelation to</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationParticipation(int eventId, string userId, string participation);

    /// <summary>
    /// Updates a EventRelations Role.
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="role">The Users new Role in the EventRelation</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationRole(int eventId, string userId, string role);

    /// <summary>
    /// Fetches a Events relations based on the Type of the relation.
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="participation">The Participation of the relation</param>
    /// <returns>A list of EventRelations</returns>
    Task<ICollection<EventRelation>> GetEventRelationsByParticipation(int eventId, string participation);

    // HER MÅ DET MULIGENS OPPRETTES EN LYTTER SOM FETCHER DATA NÅR DET KOMMER NYE ENTRIES I DATABASEN (GetEventRelations)

    /// <summary>
    /// Fetches a Events relations based on the Role of the relation.
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="role">The Role of the relation</param>
    /// <returns>A list of EventRelations</returns>
    Task<ICollection<EventRelation>> GetEventRelationsByRole(int eventId, string role);

    // HER MÅ DET MULIGENS OPPRETTES EN LYTTER SOM FETCHER DATA NÅR DET KOMMER NYE ENTRIES I DATABASEN (GetEventRelations)
}