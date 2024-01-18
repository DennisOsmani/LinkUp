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
        return await _context.Users.FindAsync(userId);
    }

    //Searchusers

    public async Task<User?> UpdateUser(User user)
    {

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
        User? userToDelete = await _context.Users.FindAsync(userId);

        if (userToDelete != null)
        {
            _context.Users.Remove(userToDelete);
            await _context.SaveChangesAsync();
        }
        return userToDelete;
    }

    //getUsersFromEvent

}