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

    public async Task<ICollection<User?>> GetUsersFromEventByParticipation(int eventId, EventRelationParticipation participation)
    {
        try
        {
            return await _context.EventRelations
                .Where(er => er.EventID == eventId && er.EventRelationParticipation == participation)
                .Select(er => er.User)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<ICollection<User?>> GetUsersFromEventByRole(int eventId, EventRole role)
    {
        try
        {
            return await _context.EventRelations
                .Where(er => er.EventID == eventId && er.EventRole == role)
                .Select(er => er.User)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<EventRelation> UpdateEventRelationRole(EventRelation eventRelation, EventRole role)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                eventRelation.EventRole = role;
                _context.EventRelations.Update(eventRelation);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return eventRelation;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}");
            }
        }
    }

    public async Task<EventRelation> UpdateEventRelationParticipation(EventRelation eventRelation, EventRelationParticipation participation)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                eventRelation.EventRelationParticipation = participation;
                _context.EventRelations.Update(eventRelation);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return eventRelation;
            }
            catch (InvalidOperationException e)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}");
            }
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
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<ICollection<EventRelation>> GetAllEventRelations(int eventId)
    {
        try
        {
            return await _context.EventRelations
                .Where(er => er.EventID == eventId)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task CreateEventRelation(EventRelation newEventRelation)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                _context.Add(newEventRelation);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}");
            }
        }
    }

    public async Task<ICollection<string>> GetExistingUserIds(ICollection<string> userIds)
    {
        try
        {
            return await _context.Users
                .Where(u => userIds.Contains(u.UserID))
                .Select(u => u.UserID)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task<bool> IsUserHostOrCreator(int eventId, string userId)
    {
        try
        {
            return await _context.EventRelations
                .AnyAsync(
                    er => er.EventID == eventId && er.UserID == userId && (er.EventRole == EventRole.CREATOR || er.EventRole == EventRole.HOST)
                );
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }
    }

    public async Task DeleteUserFromEvent(EventRelation eventRelation)
    {
        try
        {
            _context.Remove(eventRelation);
            await _context.SaveChangesAsync();
        }

        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRelationRepo)");
        }

    }
}
