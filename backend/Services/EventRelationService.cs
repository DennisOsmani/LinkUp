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


    public EventRelationService(EventRelationRepository erRepo, EventRepository eventRepo, UserRepository userRepo)
    {
        _erRepo = erRepo;
        _eventRepo = eventRepo;
        _userRepo = userRepo;
    }

    public async Task<ICollection<EventRelation>> GetEventRelationsByParticipation(int eventId, string participation)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);
        EventRelationParticipation eventType = StringToEventRelationParticipationEnum(participation);

        if(eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, was not found! (EventRelationService)");
        }
        
        return await _erRepo.GetEventRelationsByParticipation(eventId, eventType);
    }

    public async Task<ICollection<EventRelation>> GetEventRelationsByRole(int eventId, string role)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);
        EventRole eventRole = StringToEventRelationRoleEnum(role);

        if(eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, was not found! (EventRelationService)");
        }

        return await _erRepo.GetEventRelationsByRole(eventId, eventRole);
    }

    public async Task<EventRelation> UpdateEventRelationRole(int eventId, string userId, string role)
    {
        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventId, userId);
        EventRole eventRole = StringToEventRelationRoleEnum(role);

        if(eventRelation == null)
        {
            throw new KeyNotFoundException($"EventRelation with eventID: {eventId}, and UserID: {userId}, was not found! (EventRelationService)");
        }

        return await _erRepo.UpdateEventRelationRole(eventRelation, eventRole);
    }

    public async Task<EventRelation> UpdateEventRelationParticipation(int eventId, string userId, string participation)
    {
        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventId, userId);
        EventRelationParticipation eventParticipation = StringToEventRelationParticipationEnum(participation);

        if(eventRelation == null)
        {
            throw new KeyNotFoundException($"EventRelation with eventID: {eventId}, and UserID: {userId}, was not found! (EventRelationService)");
        }

        return await _erRepo.UpdateEventRelationParticipation(eventRelation, eventParticipation);
    }

    public async Task<EventRelation> CreateEventRelation(int eventId, string userId, string participation, string role)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);
        User? user = await _userRepo.GetUserByID(userId);
        EventRelationParticipation participationEnum = StringToEventRelationParticipationEnum(participation);
        EventRole roleEnum = StringToEventRelationRoleEnum(role);
        
        if(eventt == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, does not exist! (EventRelationService)");
        }   

        if(user == null)
        {
            throw new KeyNotFoundException($"User with ID: {userId}, does not exist! (EventRelationService)");
        }

        EventRelation eventRelation = new EventRelation(eventId, eventt, userId, participationEnum, roleEnum);

        await _erRepo.CreateEventRelation(eventRelation);
        return eventRelation;
    }

    public EventRelationParticipation StringToEventRelationParticipationEnum(string participation)
    {
        EventRelationParticipation erType;
        
        switch(participation)
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
        
        switch(role)
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
}