using Repositories;
using Interfaces;
using Models;
using Enums;

namespace Services;

public class EventRelationService : IEventRelationService
{
    public readonly EventRelationRepository _erRepo;
    public readonly EventRepository _eventRepo;
    public readonly UserRepository _userRepo;
    public readonly UserRelationRepository _userRelRepo;


    public EventRelationService(EventRelationRepository erRepo, EventRepository eventRepo, UserRepository userRepo, UserRelationRepository userRelRepo)
    {
        _erRepo = erRepo;
        _eventRepo = eventRepo;
        _userRepo = userRepo;
        _userRelRepo = userRelRepo;
    }

    public async Task<EventRelation> UpdateEventRelationRole(int eventId, string userId, string role)
    {
        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventId, userId);
        EventRole eventRole = StringToEventRelationRoleEnum(role);

        if (eventRelation == null)
        {
            throw new KeyNotFoundException($"EventRelation with eventID: {eventId}, and UserID: {userId}, was not found! (EventRelationService)");
        }

        if (eventRole == EventRole.CREATOR)
        {
            throw new Exception($"Cannot set users eventrole to CREATOR (EventRelationService)");
        }

        return await _erRepo.UpdateEventRelationRole(eventRelation, eventRole);
    }

    public async Task<EventRelation> UpdateEventRelationParticipation(int eventId, string userId, string participation)
    {
        User? user = await _userRepo.GetUserByID(userId);
        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventId, userId);
        EventRelationParticipation eventParticipation = StringToEventRelationParticipationEnum(participation);

        if (eventRelation == null)
        {
            throw new KeyNotFoundException($"EventRelation with eventID: {eventId}, and UserID: {userId}, was not found! (EventRelationService)");
        }

        if (eventParticipation == EventRelationParticipation.JOINED
        && eventRelation.EventRelationParticipation == EventRelationParticipation.PENDING)
        {
            user.EventsJoined++;
            await _userRepo.UpdateUser(userId, user);
        }

        if (eventParticipation == EventRelationParticipation.BAILED
        && eventRelation.EventRelationParticipation == EventRelationParticipation.JOINED)
        {
            user.EventBails++;
            await _userRepo.UpdateUser(userId, user);
        }

        return await _erRepo.UpdateEventRelationParticipation(eventRelation, eventParticipation);
    }

    public async Task<EventRelation> JoinOpenEvent(EventRelation eventRelation)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventRelation.EventID);
        User? user = await _userRepo.GetUserByID(eventRelation.UserID);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventRelation.EventID}, does not exist! (EventRelationService)");
        }

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID: {eventRelation.UserID}, does not exist! (EventRelationService)");
        }

        if (eventt.Visibility == Visibility.PRIVATE)
        {
            throw new Exception($"User with ID: {eventRelation.UserID} cannot Join Private event without invite (EventRelationService)");
        }

        if (eventt.Visibility == Visibility.PUBLIC)
        {
            await _erRepo.CreateEventRelation(eventRelation);
            user.EventsJoined++;
            await _userRepo.UpdateUser(user.UserID, user);
        }

        if (eventt.Visibility == Visibility.FRIENDS)
        {
            var creatorList = await _erRepo.GetUsersFromEventByRole(eventt.EventID, EventRole.CREATOR);
            User? creator = creatorList.FirstOrDefault();
            UserRelation? userRelation = await _userRelRepo.GetOneUserRelation(user.UserID, creator.UserID);
            if (userRelation.Type == UserRelationType.FRIENDS)
            {
                await _erRepo.CreateEventRelation(eventRelation);
                user.EventsJoined++;
                await _userRepo.UpdateUser(user.UserID, user);
            }
            else
            {
                throw new Exception($"User with ID: {eventRelation.UserID} cannot Join Friends-only event without being friends with creator(EventRelationService)");
            }
        }
        return eventRelation;
    }

    public async Task InviteUsersForEvent(ICollection<string> userIds, int eventId)
    {

        Event? eventt = await _eventRepo.GetEventByID(eventId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, does not exist! (EventRelationService)");
        }

        userIds = await _erRepo.GetExistingUserIds(userIds);

        if (userIds.Count() == 0)
        {
            throw new KeyNotFoundException($"No existing users for userIds Collection! (EventRelationService)");
        }

        foreach (string id in userIds)
        {
            EventRelation eventRelation = new EventRelation(eventId, id, EventRelationParticipation.PENDING, EventRole.PARTICIPANT);

            await _erRepo.CreateEventRelation(eventRelation);
        }
    }

    public async Task<bool> HaveUserJoinedEvent(int eventId, string userId)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);
        User? user = await _userRepo.GetUserByID(userId);
        bool joined = true;

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, does not exist! (EventRelationService)");
        }

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID: {userId}, does not exist! (EventRelationService)");
        }

        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventt.EventID, user.UserID);

        if (eventRelation == null)
        {
            joined = false;
        }

        if (eventRelation?.EventRelationParticipation != EventRelationParticipation.JOINED)
        {
            joined = false;
        }

        return joined;
    }

    public async Task<bool> CanUserUpdateRoleInEvent(int eventId, string userId)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);
        User? user = await _userRepo.GetUserByID(userId);
        bool canUpdate = true;

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, does not exist! (EventRelationService)");
        }

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID: {userId}, does not exist! (EventRelationService)");
        }

        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventt.EventID, user.UserID);

        if (eventRelation == null)
        {
            canUpdate = false;
        }

        if (eventRelation?.EventRole != EventRole.CREATOR)
        {
            canUpdate = false;
        }

        return canUpdate;
    }

    public EventRelationParticipation StringToEventRelationParticipationEnum(string participation)
    {
        EventRelationParticipation erType;

        switch (participation)
        {
            case "JOINED":
                erType = EventRelationParticipation.JOINED;
                break;
            case "DECLINED":
                erType = EventRelationParticipation.DECLINED;
                break;
            case "PENDING":
                erType = EventRelationParticipation.PENDING;
                break;
            case "BAILED":
                erType = EventRelationParticipation.BAILED;
                break;
            default:
                erType = EventRelationParticipation.PENDING;
                break;
        }

        return erType;
    }

    public EventRole StringToEventRelationRoleEnum(string role)
    {
        EventRole erRole;

        switch (role)
        {
            case "CREATOR":
                erRole = EventRole.CREATOR;
                break;
            case "HOST":
                erRole = EventRole.HOST;
                break;
            case "PARTICIPANT":
                erRole = EventRole.PARTICIPANT;
                break;
            default:
                erRole = EventRole.PARTICIPANT;
                break;
        }

        return erRole;
    }

    public async Task RemoveUserFromEvent(int eventId, string userId)
    {
        var eventRelation = await _erRepo.GetEventRelation(eventId, userId);

        if (eventRelation == null)
        {
            throw new KeyNotFoundException($"EventRelation with EventId {eventId}, and UserID {userId}, does not exist!");
        }

        await _erRepo.DeleteUserFromEvent(eventRelation);
    }

    public async Task<bool> IsUserHostOrCreator(int eventId, string userId)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);
        User? user = await _userRepo.GetUserByID(userId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, does not exist! (EventRelationService)");
        }

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID: {userId}, does not exist! (EventRelationService)");
        }

        return await _erRepo.IsUserHostOrCreator(eventId, userId);
    }
}