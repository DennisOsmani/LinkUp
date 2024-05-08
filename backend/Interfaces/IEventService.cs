using Models;
using DTOs;

/// <summary>
/// Service Interface for all data manipulation on the Events table.
/// </summary>
namespace Interfaces;

public interface IEventService
{
    /// <summary>
    /// Fetches a Event by a given id.
    /// </summary>
    /// <param name="eventId">The event we want to fetch</param>
    /// <returns>The Event or null if the event with the given id does not exist</returns>
    Task<Event?> GetEventByID(int eventId);

    /// <summary>
    /// Fetches a list of Events based on what city this user are or have set themselves, where visibility is PUBLIC.
    /// It does not return events if the user has a relations to the event.
    /// </summary>
    /// <param name="city">The city searhing for</param>
    /// <param name="userId">The user we want to fetch for</param>
    /// <returns>A list of Events, or a empty collection if there are no events in the city</returns>
    Task<ICollection<Event>> GetEventsInCity(string city, string userId);

    /// <summary>
    /// Fetches the user that has EventRole set to CREATOR in a event.
    /// </summary>
    /// <param name="eventId">The event we want to get host from</param>
    /// <returns>The User Host object</returns>
    Task<User> GetHostForEvent(int eventId);

    /// <summary>
    /// Fetches a list of Events where the user has the UserRelation Friends to the creator and visibility set to FRIENDS.
    /// </summary>
    /// <param name="userId">The user we are fething for</param>
    /// <returns>A list of Events, or null if there user has no friends with events set to only FRIENDS</returns>
    Task<ICollection<Event>?> GetUserFriendEvents(string userId);

    /// <summary>
    /// Fetches a list of Events that the user is invited to, where the user has set the EventRelationParticipation is set to PENDING
    /// </summary>
    /// <param name="userId">The user we are fetchind events for</param>
    /// <returns>A list of Events, or a empty collection if the user has no invites</returns>
    Task<ICollection<Event?>> GetUserEventInvites(string userId);

    /// <summary>
    /// Fetches a list of the Events the user has set the EventRelationParticipation is set to JOINED
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>A list of Events</returns>
    Task<ICollection<Event?>> GetUserJoinedEvents(string userId);

    /// <summary>
    /// Creates a new Event and sets the user with the given id role to CREATOR.
    /// </summary>
    /// <param name="newEvent">the Event Object to be created</param>
    /// <returns>Newly created Event<returns>
    Task<Event?> CreateEvent(Event newEvent, string creatorUserId);

    /// <summary>
    /// Updates a Event.
    /// </summary>
    /// <param name="updatedEvent">The newly updated Event Object</param>
    /// <returns>The Updated Event<returns> 
    Task<Event> UpdateEvent(Event updatedEvent);

    /// <summary>
    /// Deletes a Event.
    /// </summary>
    /// <param name="eventId">The event to delete</param>
    Task DeleteEvent(int eventId);

    /// <summary>
    /// Checks if the logged in user should have acces to GetEvent method in EventController
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <param name="userId">Id of the relevant user</param>
    /// <returns>True if access should be given, false else<returns> 
    Task<bool> CanUserViewEvent(int eventId, string userId);

    /// <summary>
    /// Checks if the logged in user should have access to UpdateEvent method in EventController
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <param name="userId">Id of the relevant user</param>
    /// <returns>True if permisson should be granted, false else<returns> 
    Task<bool> CanUserUpdateEvent(int eventId, string userId);

    /// <summary>
    /// Checks if the logged in user should have acces to DeleteEvent method in EventController
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <param name="userId">Id of the relevant user</param>
    /// <returns>True if permisson should be granted, false else<returns> 
    Task<bool> CanUserDeleteEvent(int eventId, string userId);

    /// <summary>
    /// Gets all EventRelations for a given event, including the user connected to the relation.
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <returns>A list of EventRelations including the user connected to the relation<returns> 
    Task<ICollection<UserWithEventParticipationDTO>> GetEventRelationsFromEvent(int eventId);

    /// <summary>
    /// Gets the number of participants for a given event.
    /// </summary>
    /// <param name="eventId">Id of the relevant event</param>
    /// <returns>The number of participants in a evnet<returns> 
    Task<int> GetEventParticipationNumber(int eventId);
}
