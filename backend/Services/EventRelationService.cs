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

    public async Task<ICollection<EventRelation>> GetEventRelationsByType(string eventId, string type)
    {
        int eventIdInteger;

        try
        {
            eventIdInteger = int.Parse(eventId);
        }
        catch(FormatException)
        {
            throw new FormatException($"Failed to parse eventId: ${eventId}, to Integer");
        }

        EventRelation eventRelation = await _eventRepo.GetEventByID(eventId);
        EventRelationType eventType = StringToEventRelationTypeEnum(type);

        if(eventRelation == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, was not found!");
        }

        return await _erRepo.GetEventRelationsByType(eventIdInteger, eventType);
    }

    public async Task<ICollection<EventRelation>> GetEventRelationsByRole(string eventId, string role)
    {
        int eventIdInteger;

        try
        {
            eventIdInteger = int.Parse(eventId);
        }
        catch(FormatException)
        {
            throw new FormatException($"Failed to parse eventId: ${eventId}, to Integer");
        }

        EventRelation eventRelation = await _eventRepo.GetEventByID(eventId);
        EventRole eventRole = StringToEventRelationRoleEnum(role);

        if(eventRelation == null)
        {
            throw new KeyNotFoundException($"Event with ID: {eventId}, was not found!");
        }

        return await _erRepo.GetEventRelationsByRole(eventIdInteger, eventRole);
    }

    public async Task<EventRelation> UpdateEventRelationRole(string eventId, string userId, string role)
    {
        int eventIdInteger;

        try
        {
            eventIdInteger = int.Parse(eventId);
        }
        catch(FormatException)
        {
            throw new FormatException($"Failed to parse eventId: ${eventId}, to Integer");
        }

        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventIdInteger, userId);
        EventRole eventRole = StringToEventRelationRoleEnum(role);

        if(eventRelation == null)
        {
            throw new KeyNotFoundException($"EventRelation with eventID: {eventId}, and UserID: {userId}, was not found!");
        }

        return await _erRepo.UpdateEventRelationRole(eventRelation, eventRole);
    }

    public async Task<EventRelation> UpdateEventRelationType(string eventId, string userId, string type)
    {
        int eventIdInteger;

        try
        {
            eventIdInteger = int.Parse(eventId);
        }
        catch(FormatException)
        {
            throw new FormatException($"Failed to parse eventId: ${eventId}, to Integer");
        }

        EventRelation? eventRelation = await _erRepo.GetEventRelation(eventIdInteger, userId);
        EventRelationType eventType = StringToEventRelationTypeEnum(type);

        if(eventRelation == null)
        {
            throw new KeyNotFoundException($"EventRelation with eventID: {eventId}, and UserID: {userId}, was not found!");
        }

        return await _erRepo.UpdateEventRelationType(eventRelation, eventType);
    }

    public EventRelationType StringToEventRelationTypeEnum(string type)
    {
        EventRelationType erType;
        
        switch(type)
        {
            case "JOINED":
                erType = EventRelationType.JOINED;
                break;
            case "DECLINED":
                erType = EventRelationType.DECLINED;
                break;
            case "PENDING":
                erType = EventRelationType.PENDING;
                break;
            case "BAILED":
                erType = EventRelationType.BAILED;
                break;
            default:
                erType = EventRelationType.PENDING;
                break;
        }

        return erType;
    }

    public EventRole StringToEventRelationRoleEnum(string type)
    {
        EventRole erType;
        
        switch(type)
        {
            case "CREATOR":
                erType = EventRole.CREATOR;
                break;
            case "HOST":
                erType = EventRole.HOST;
                break;
            case "PARTICIPANT":
                erType = EventRole.PARTICIPANT;
                break;
            default:
                erType = EventRole.PARTICIPANT;
                break;
        }

        return erType;
    }
}