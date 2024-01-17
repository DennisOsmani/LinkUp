using Microsoft.AspNetCore.Mvc;
using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for updating EventRelations
/// </summary>
public interface IEventRelationService
{
    /// <summary>
    /// Updates a EventRealtions Type.
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="type">The Type we want to update the EventRelation to</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationType([FromQuery] string eventId, [FromQuery] string userId, [FromQuery] string type);

    /// <summary>
    /// Updates a EventRelations Role.
    /// </summary>
    /// <param name="eventId">The event we want to update our relation to</param>
    /// <param name="userId">The User we want to update the EventRelation for</param>
    /// <param name="role">The Users new Role in the EventRelation</param>
    /// <returns>The updated EventRelation</returns>
    Task<EventRelation> UpdateEventRelationRole([FromQuery] string eventId, [FromQuery] string userId, [FromQuery] string role);

    /// <summary>
    /// Fetches a Events relations based on the Type of the relation.
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="type">The Type of the relation</param>
    /// <returns>A list of EventRelations</returns>
    Task<List<UserRelation>> GetEventRelations([FromQuery] string eventId, [FromQuery] string type);

    // HER MÅ DET MULIGENS OPPRETTES EN LYTTER SOM FETCHER DATA NÅR DET KOMMER NYE ENTRIES I DATABASEN (GetEventRelations)
}