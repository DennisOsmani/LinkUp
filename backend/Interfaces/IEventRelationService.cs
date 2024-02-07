using Models;

namespace Interfaces;

/// <summary>
/// Service Interface for updating EventRelations
/// </summary>
public interface IEventRelationService
{
    /// <summary>
    /// Fetches a Events relations based on the Type of the relation.
    /// HER MÅ DET MULIGENS OPPRETTES EN LYTTER SOM FETCHER DATA NÅR DET KOMMER NYE ENTRIES I DATABASEN (GetEventRelations)
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="participation">The Participation of the relation</param>
    /// <returns>A list of EventRelations</returns>
    Task<ICollection<User?>> GetUsersFromEventByParticipation(int eventId, string participation);

    /// <summary>
    /// Fetches a Events relations based on the Role of the relation.
    /// HER MÅ DET MULIGENS OPPRETTES EN LYTTER SOM FETCHER DATA NÅR DET KOMMER NYE ENTRIES I DATABASEN (GetEventRelations)
    /// </summary>
    /// <param name="eventId"></param>
    /// <param name="role">The Role of the relation</param>
    /// <returns>A list of EventRelations</returns>
    Task<ICollection<User?>> GetUsersFromEventByRole(int eventId, string role);

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
    Task<EventRelation> CreateEventRelation(EventRelation eventRelation);




}