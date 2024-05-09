using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

/// <summary>
/// Repository for handling User updates and manipulation to User table.
/// </summary>
public class UserRepository
{
    public readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> DoesEmailExist(string email)
    {
        try
        {
            return await _context.Users
                .AnyAsync(u => u.Email.ToUpper() == email.ToUpper());
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRepo)");
        }
    }

    public async Task<User?> GetUserByID(string userId)
    {
        try
        {
            return await _context.Users.FindAsync(userId);
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRepo)");
        }
    }

    public async Task<string?> CreateUser(User user)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                _context.Add(user);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return user.Email;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}");
            }
        }
    }

    public async Task<User?> UpdateUser(string oldUserId, User newUser)
    {
        User? oldUser = await GetUserByID(oldUserId);

        try
        {
            oldUser.ProfileImage = newUser.ProfileImage;
            oldUser.Description = newUser.Description;
            oldUser.Phone = newUser.Phone;
            oldUser.RelationshipStatus = newUser.RelationshipStatus;

            _context.Update(oldUser);
            await _context.SaveChangesAsync();
            return oldUser;
        }
        catch (Exception e)
        {
            throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}");
        }
    }

    public async Task DeleteUser(User user)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                _context.Remove(user);
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

    public async Task<ICollection<User>> SearchUsers(string searchString)
    {
        try
        {
            int maxresults = 40;
            IQueryable<User> query = _context.Users;

            string upperCaseSearchString = searchString.ToUpper();
            query = query.Where(u => (u.Firstname + " " + u.Lastname).ToUpper().Contains(upperCaseSearchString));
            query = query.Take(maxresults);

            return await query.ToListAsync();
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRepo)");
        }
    }

    public async Task<ICollection<User>> GetUsersFromEvent(int eventId)
    {
        try
        {
            return await _context.Users
                .Where(u => u.EventRelations != null && u.EventRelations.Any(er => er.EventID == eventId))
                .ToListAsync();

            /*
            return await _context.EventRelations
                .Where(ev => ev.User != null && ev.EventID == eventId)
                .Select(ev => ev.User)
                .ToListAsync();
            */
        }
        catch (InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRepo)");
        }
    }
}
