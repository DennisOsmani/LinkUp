using Data;
using Models;
using Enums;
using Microsoft.EntityFrameworkCore;

namespace Repositories;

/// <summary>
/// Repository for handling EventRelation updates and manipulation to EventRelations table.
/// </summary>
public class EventRelationRepository
{
    public readonly AppDbContext _context;

    public EventRelationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ICollection<EventRelation>> GetEventRelationsByParticipation(int eventId, EventRelationParticipation participation)
    {
        try{
            return await _context.EventRelations
                .Where(er => er.EventID == eventId && er.EventRelationParticipation == participation)
                .ToListAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<ICollection<EventRelation>> GetEventRelationsByRole(int eventId, EventRole role)
    {
        try{
            return await _context.EventRelations
                .Where(er => er.EventID == eventId && er.EventRole == role)
                .ToListAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<EventRelation> UpdateEventRelationRole(EventRelation eventRelation, EventRole role)
    {
        try{
            eventRelation.EventRole = role;
            await _context.SaveChangesAsync();

            return eventRelation;
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<EventRelation> UpdateEventRelationParticipation(EventRelation eventRelation, EventRelationParticipation participation)
    {
        try
        {
            eventRelation.EventRelationParticipation = participation;
            await _context.SaveChangesAsync();

            return eventRelation;
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<EventRelation?> GetEventRelation(int eventId, string userId)
    {
        try
        {
            return await _context.EventRelations
                .Where(er => er.EventID == eventId && er.UserID == userId)
                .FirstOrDefaultAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task CreateEventRelation(EventRelation newEventRelation)
    {   
        try
        {
            _context.Add(newEventRelation);
            await _context.SaveChangesAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }
}