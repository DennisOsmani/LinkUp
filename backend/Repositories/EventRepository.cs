using Data;
using Models;
using Microsoft.EntityFrameworkCore;
using Enums;

namespace Repositories;

/// <summary>
/// Repository for handling Event updates and manipulation to Event table.
/// </summary>
public class EventRepository
{
    public readonly AppDbContext _context;
    public readonly LocationRepository _locationRepo;

    public EventRepository(AppDbContext context, LocationRepository locationRepo)
    {
        _context = context;
        _locationRepo = locationRepo;
    }

    public async Task<Event?> GetEventByID(int eventId)
    {
        try
        {
            return await _context.Events.FindAsync(eventId);
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task<ICollection<Event>> GetEventsInCity(string city, string userId)
    {
        try
        {
            return await _context.Events
                .Where(e => e.Location.City.ToUpper() == city.ToUpper() && e.Visibility == Visibility.PUBLIC && e.EventDateTimeStart.AddHours(2) > DateTime.Now)
                .Where(e => !_context.EventRelations.Any(er => er.EventID == e.EventID && er.UserID == userId))
                .OrderBy(e => e.EventDateTimeStart)
                .Include(e => e.Location)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task<ICollection<Event?>> GetUserFriendEvents(List<string> userIds, string userId)
    {
        try
        {
            var eventsForFriends = await _context.EventRelations
                .Include(er => er.Event) 
                    .ThenInclude(e => e.Location) 
                .Where(
                    er => userIds.Contains(er.UserID)
                    && er.EventRole == EventRole.CREATOR
                )
                .Select(er => er.Event)
                .Where(e => e.Visibility == Visibility.FRIENDS && e.EventDateTimeStart.AddHours(2) > DateTime.Now)
                .ToListAsync();

            var usersEvents = await _context.EventRelations
                .Where(er => er.UserID == userId)
                .Select(er => er.Event)
                .OrderBy(e => e.EventDateTimeStart)
                .ToListAsync();

            return eventsForFriends.Except(usersEvents).ToList();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task<ICollection<Event?>> GetUserEventInvites(string userId)
    {
        try
        {
            return await _context.EventRelations
                .Include(er => er.Event)
                    .ThenInclude(e => e.Location)
                .Where(
                    er => er.UserID.Equals(userId)
                    && er.EventRelationParticipation == EventRelationParticipation.PENDING
                )

                .Select(er => er.Event)
                .Where(e => e.EventDateTimeStart.AddHours(2) > DateTime.Now)
                .OrderBy(e => e.EventDateTimeStart)
                .ToListAsync();
        }

        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task<ICollection<Event?>> GetUserJoinedEvents(string userId)
    {
        try
        {
            return await _context.EventRelations
                .Include(er => er.Event)
                        .ThenInclude(e => e.Location)
                .Where(
                    er => er.UserID == userId
                    && er.EventRelationParticipation == EventRelationParticipation.JOINED
                )
                .Select(er => er.Event)
                .Where(e => e.EventDateTimeStart.AddHours(2) > DateTime.Now)
                .OrderBy(e => e.EventDateTimeStart)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task<ICollection<Event?>> GetCreatedEvents(string userId)
    {
        try
        {
            return await _context.EventRelations
                .Where(
                    er => er.UserID.Equals(userId)
                    && er.EventRole == EventRole.CREATOR
                )
                .Select(er => er.Event)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task CreateEvent(Event newEvent)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                _context.Events.Add(newEvent);
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

    public async Task<Event> UpdateEvent(Event newEvent, Event oldEvent)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                oldEvent.EventName = newEvent.EventName;
                oldEvent.EventDescription = newEvent.EventDescription;
                oldEvent.EventDateTimeStart = newEvent.EventDateTimeStart;
                oldEvent.EventDateTimeEnd = newEvent.EventDateTimeEnd;
                oldEvent.Visibility = newEvent.Visibility;
                oldEvent.InviteURL = newEvent.InviteURL;
                oldEvent.FrontImage = newEvent.FrontImage;
                oldEvent.MinCapacity = newEvent.MinCapacity;
                oldEvent.MaxCapacity = newEvent.MaxCapacity;

                _context.Events.Update(oldEvent);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return oldEvent;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}");
            }
        }
    }

    public async Task DeleteEvent(Event eventToDelete)
    {
        try
        {
            _context.Remove(eventToDelete);
            await _context.SaveChangesAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task<User?> GetHostForEvent(int eventId)
    {
        try
        {
            return await _context.Events
                .Where(e => e.EventID == eventId)
                .SelectMany(e => e.EventRelations)
                .Where(er => er.EventRole == 0)
                .Select(er => er.User)
                .FirstOrDefaultAsync();

        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }


    public async Task<ICollection<EventRelation>> GetEventRelationsFromEvent(int eventId)
    {
        try
        {
            return await _context.EventRelations
                .Where(e => e.EventID == eventId)
                .Include(e => e.User)
                .ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public async Task<int> GetEventParticipationNumber(int eventId)
    {
        try
        {
            return await _context.EventRelations
                .Where(er => er.EventID == eventId && er.EventRelationParticipation == EventRelationParticipation.JOINED)
                .CountAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (EventRepo)");
        }
    }

    public Visibility StringToVisibilityEnum(string visibility)
    {
        Visibility eventVisibility;

        switch (visibility)
        {
            case "PUBLIC":
                eventVisibility = Visibility.PUBLIC;
                break;
            case "PRIVATE":
                eventVisibility = Visibility.PRIVATE;
                break;
            case "FRIENDS":
                eventVisibility = Visibility.FRIENDS;
                break;
            default:
                eventVisibility = Visibility.PRIVATE;
                break;
        }

        return eventVisibility;
    }

}
