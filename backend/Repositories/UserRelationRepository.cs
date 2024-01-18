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

    public async Task<UserRelation> CreateUserRelaton(UserRelation userRelation)
    {
        _context.Add(userRelation);
        await _context.SaveChangesAsync();

        return userRelation;
    }

    public async Task<ICollection<UserRelation>> GetUserRelations(string userId, UserRelationType type)
    {
        return await _context.UserRelations
            .Where(ur => ur.User_first_ID == userId || ur.User_second_ID == userId)
            .Where(ur => ur.Type == type)
            .ToListAsync();
    }

    public async Task<UserRelation?> UpdateUserRelationType(UserRelation userRelation, UserRelationType type)
    {
        userRelation.Type = type;
        await _context.SaveChangesAsync();

        return userRelation;
    }

    public async Task<UserRelation?> GetUserRelation(string userId, string otherUserId)
    {
        UserRelation? userRelation = await _context.UserRelations
            .Where(ur => ur.User_first_ID == userId && ur.User_second_ID == otherUserId)
            .FirstOrDefaultAsync();

        return userRelation;
    }

    public async Task DeleteUserRelation(UserRelation userRelation)
    {
        _context.Remove(userRelation);
        await _context.SaveChangesAsync();
    }
}