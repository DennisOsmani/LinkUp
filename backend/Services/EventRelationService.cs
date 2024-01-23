using Repositories;
using Interfaces;
using Models;
using Enums;

namespace Services;

public class EventRelationService : IEventRelationService
{
    public readonly EventRelationRepository _erRepo;

    public EventRelationService(EventRelationRepository erRepo)
    {
        _erRepo = erRepo;
    }

    public Task<List<UserRelation>> GetEventRelations(string eventId, string type)
    {
        throw new NotImplementedException();
    }

    public Task<EventRelation> UpdateEventRelationRole(string eventId, string userId, string role)
    {
        throw new NotImplementedException();
    }

    public Task<EventRelation> UpdateEventRelationType(string eventId, string userId, string type)
    {
        throw new NotImplementedException();
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