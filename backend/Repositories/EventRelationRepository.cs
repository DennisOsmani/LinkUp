using Data;
using Models;
using Enums;
using Microsoft.EntityFrameworkCore;

namespace Repositories;

public class EventRelationRepository
{
    public readonly AppDbContext _context;

    public EventRelationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ICollection<EventRelation>> GetEventRelationsByType(int eventId, EventRelationType type)
    {
        return await _context.EventRelations
            .Where(er => er.EventID == eventId && er.EventRelationType == type)
            .ToListAsync();
    }

    public async Task<ICollection<EventRelation>> GetEventRelationsByRole(int eventId, EventRole role)
    {
        return await _context.EventRelations
            .Where(er => er.EventID == eventId && er.EventRole == role)
            .ToListAsync();
    }

    public async Task<EventRelation> UpdateEventRelationRole(EventRelation eventRelation, EventRole role)
    {
        eventRelation.EventRole = role;
        await _context.SaveChangesAsync();

        return eventRelation;
    }

    public async Task<EventRelation> UpdateEventRelationType(EventRelation eventRelation, EventRelationType type)
    {
        eventRelation.EventRelationType = type;
        await _context.SaveChangesAsync();

        return eventRelation;
    }

    public async Task<EventRelation?> GetEventRelation(int eventId, string userId)
    {
        return await _context.EventRelations
            .Where(er => er.EventID == eventId && er.UserID == userId)
            .FirstOrDefaultAsync();
    }
}