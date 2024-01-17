using Data;
using Enums;
using Microsoft.AspNetCore.Mvc;
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
        return await _context.UserRelation
            .Where(ur => ur.UserId == userId && ur.Type == type)
            .ToListAsync();
    }

    public async Task<UserRelation> UpdateUserRelationType(string userId, string otherUserId, [FromQuery] UserRelationType type)
    {
        UserRelation userRelation = await _context.UserRelation
            .Where(ur => ur.User_first_id == userId && ur.User_second_id == otherUserId)
            .FirstOrDefaultAsync();

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
        User user = _context.User.FindAsync(userId);
        User otherUser = _context.User.FindAsync(otherUserId);

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