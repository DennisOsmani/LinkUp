using Data;

namespace Repositories;

public class EventRelationRepository
{
    public readonly AppDbContext _context;

    public EventRelationRepository(AppDbContext context)
    {
        _context = context;
    }

    public Task<List<UserRelation>> GetEventRelations(string eventId, EventType)
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
}