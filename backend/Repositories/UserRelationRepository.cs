using System.Runtime.Intrinsics.X86;
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

    public async Task<UserRelation?> UpdateUserRelationType(UserRelation userRelation, UserRelationType type)
    {
        userRelation.Type = type;
        await _context.SaveChangesAsync();

        return userRelation;
    }

    public async Task<UserRelation?> GetOneUserRelation(string userId, string otherUserId)
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

    public async Task<ICollection<User?>> GetUserFriends(string userId)
    {
        return await _context.UserRelations
            .Where(
                ur => (ur.User_first_ID == userId || ur.User_second_ID == userId)
                && ur.Type == UserRelationType.FRIENDS
            )
            .Select(ur => ur.User_first_ID == userId ? ur.User_second : ur.User_first)
            .ToListAsync();
    }

    // The Users this user has blocked!
    public async Task<ICollection<User?>> GetUserBlocks(string userId)
    {
        return await _context.UserRelations
            .Where(
                ur => (ur.User_first_ID == userId && ur.Type == UserRelationType.BLOCKED_FIRST_SECOND)
                || (ur.User_second_ID == userId && ur.Type == UserRelationType.BLOCKED_SECOND_FIRST)
            )
            .Select(ur => ur.User_first_ID == userId ? ur.User_first : ur.User_second)
            .ToListAsync();
    }

    public async Task<ICollection<User?>> GetUserFriendRequests(string userId)
    {
        return await _context.UserRelations
            .Where(
                ur => (ur.User_first_ID == userId && ur.Type == UserRelationType.PENDING_SECOND_FIRST)
                || (ur.User_second_ID == userId && ur.Type == UserRelationType.PENDING_FIRST_SECOND)
            )
            .Select(ur => ur.User_first_ID == userId ? ur.User_second : ur.User_first)
            .ToListAsync();
    }

}