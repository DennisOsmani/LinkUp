using Data;
using Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

/// <summary>
/// Repository for handling UserRelation updates and manipulation to UserRelations table.
/// </summary>
public class UserRelationRepository
{
    public readonly AppDbContext _context;

    public UserRelationRepository(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<List<UserRelation>> GetUserRelations(string userId, UserRelationType type)
    {
        return await _context.UserRelations
            .Where(ur => ur.User_first_id == userId || ur.User_second_id == userId)
            .Where(ur => ur.Type == type)
            .ToListAsync();
    }

    public async Task<UserRelation> UpdateUserRelationType(string userId, string otherUserId, [FromQuery] UserRelationType type)
    {
        UserRelation? userRelation = await _context.UserRelations
            .Where(ur => ur.User_first_id == userId && ur.User_second_id == otherUserId)
            .FirstOrDefaultAsync<UserRelation>();

        if(userRelation == null)
        {
            return null;
        }

        userRelation.Type = type;
        await _context.SaveChangesAsync();

        return userRelation;
    }

    public async Task<UserRelation> CreateUserRelaton(string userId, string otherUserId)
    {
        User? user = await _context.Users.FindAsync(userId);
        User? otherUser = await _context.Users.FindAsync(otherUserId);

        if(user == null || otherUser == null)
        {
            return null;
        }

        UserRelation userRelation = new UserRelation(userId, otherUserId, UserRelationType.PENDING_FIRST_SECOND);

        _context.Add(userRelation);
        await _context.SaveChangesAsync();

        return userRelation;
    }
}