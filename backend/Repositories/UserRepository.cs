using System.Data.Common;
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
        this._context = context;
    }

    public async Task<User?> GetUserByID(string userId)
    {
        return await _context.Users.FindAsync(userId);
    }

    public async Task<ICollection<User>> SearchUsers(string searchString)
    {
        int maxresults = 40;
        IQueryable<User> query = _context.Users;
        query = query.Where(u => (u.Firstname + " " + u.Lastname).Contains(searchString));
        query = query.Take(maxresults);
        return await query.ToListAsync();
    }

    public async Task<User?> UpdateUser(User oldUser, User newUser)
    {
        var entry = _context.Entry(oldUser);

        foreach (var property in oldUser.GetType().GetProperties())
        {
            var propertyName = property.Name;
            var newValue = entry.Property(propertyName).IsModified ? entry.Property(propertyName).CurrentValue : null;
            var userValue = typeof(User).GetProperty(propertyName)?.GetValue(newUser);

            if (userValue != null)
            {
                entry.Property(propertyName).CurrentValue = userValue;
            }

        }
        await _context.SaveChangesAsync();
        return oldUser;
    }

    public async Task DeleteUser(User user)
    {
        _context.Remove(user);
        await _context.SaveChangesAsync();
    }

    public async Task<ICollection<User>> GetUsersFromEvent(int eventId)
    {
        return await _context.Users
            .Where(u => u.EventRelations != null && u.EventRelations.Any(er => er.EventID == eventId))
            .ToListAsync();
    }

}