using Data;
using Enums;
using Microsoft.AspNetCore.Mvc;
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
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentNullException("User cannot be null or empty.", nameof(userId));
        }
        return await _context.Users.FindAsync(userId);
    }

    public async Task<ICollection<User>> SearchUsers(string searchString)
    {
        int maxresults = 40;
        IQueryable<User> query = _context.Users;

        if (!string.IsNullOrEmpty(searchString))
        {
            query = query.Where(u => (u.Firstname + " " + u.Lastname).Contains(searchString));
        }
        query = query.Take(maxresults);

        return await query.ToListAsync();
    }

    public async Task<User?> UpdateUser(User user)
    {
        if (user == null)
        {
            // Exception on faulty input
            throw new ArgumentNullException("User cannot be null or empty.", nameof(user));
        }
        User? userToChange = await _context.Users.FindAsync(user.UserID);
        if (userToChange != null)
        {
            _context.Entry(userToChange).CurrentValues.SetValues(user);
            await _context.SaveChangesAsync();
        }
        return userToChange;
    }

    public async Task<User?> DeleteUser(string userId)
    {

        if (string.IsNullOrEmpty(userId))
        {
            // Exception on faulty input
            throw new ArgumentException("User ID cannot be null or empty.", nameof(userId));
        }

        User? userToDelete = await _context.Users.FindAsync(userId);

        if (userToDelete != null)
        {
            _context.Users.Remove(userToDelete);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                //log error
            }
        }
        return userToDelete;
    }

    public async Task<ICollection<User>> GetUsersFromEvent(int eventId)
    {
        return await _context.Users
        .Where(u => u.EventRelations != null && u.EventRelations.Any(er => er.EventID == eventId))
        .ToListAsync();
    }

}