using Data;
using Enums;
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
        _context = context;
    }

    public async Task<UserRelation> CreateUserRelaton(UserRelation userRelation)
    {
        using(var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                _context.Add(userRelation);
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
                return userRelation;
            }
            catch(Exception e)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}"); 
            }
        }
    }

    public async Task<UserRelation> UpdateUserRelationType(UserRelation userRelation, UserRelationType type)
    {
        using(var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                userRelation.Type = type;
                _context.UserRelations.Update(userRelation);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return userRelation;
            }
            catch(Exception e)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException($"Error updating EventRelation role: {e.Message}"); 
            }
        }
    }

    public async Task DeleteUserRelation(UserRelation userRelation)
    {
        try
        {
            _context.Remove(userRelation);
            await _context.SaveChangesAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }

    // Needed in one specific way (Amund Fremming author)
    public async Task<UserRelation?> GetOneUserRelation(string userId, string otherUserId)
    {
        try
        {
            UserRelation? userRelation = await _context.UserRelations
                .Where(ur => ur.User_first_ID == userId && ur.User_second_ID == otherUserId)
                .FirstOrDefaultAsync();

            return userRelation;
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }

    public async Task<UserRelation?> GetUserRelation(string userId, string otherUserId)
    {
        try
        {
            UserRelation? userRelation = await _context.UserRelations
                .Where(ur => (ur.User_first_ID == userId && ur.User_second_ID == otherUserId) 
                || (ur.User_first_ID == otherUserId && ur.User_second_ID == userId))
                .FirstOrDefaultAsync();

            return userRelation;
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }

    public async Task<ICollection<User?>> GetUserFriends(string userId)
    {
        try
        {
            return await _context.UserRelations
                .Where(
                    ur => (ur.User_first_ID == userId || ur.User_second_ID == userId)
                    && ur.Type == UserRelationType.FRIENDS
                )
                .Select(ur => ur.User_first_ID == userId ? ur.User_second : ur.User_first)
                .ToListAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }

     public async Task<ICollection<UserRelation>> GetAllUsersRelations(string userId)
    {
        try
        {
            return await _context.UserRelations
                .Where(ur => ur.User_first_ID == userId || ur.User_second_ID == userId)
                .ToListAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }

    // The Users this user has blocked!
    public async Task<ICollection<User?>> GetUserBlocks(string userId)
    {
        try
        {
            return await _context.UserRelations
                .Where(
                    ur => (ur.User_first_ID == userId && ur.Type == UserRelationType.BLOCKED_FIRST_SECOND)
                    || (ur.User_second_ID == userId && ur.Type == UserRelationType.BLOCKED_SECOND_FIRST)
                )
                .Select(ur => ur.User_first_ID == userId ? ur.User_second : ur.User_first)
                .ToListAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }

    public async Task<ICollection<User?>> GetUserFriendRequests(string userId)
    {
        try
        {
            return await _context.UserRelations
                .Where(
                    ur => (ur.User_first_ID == userId && ur.Type == UserRelationType.PENDING_SECOND_FIRST)
                    || (ur.User_second_ID == userId && ur.Type == UserRelationType.PENDING_FIRST_SECOND)
                )
                .Select(ur => ur.User_first_ID == userId ? ur.User_second : ur.User_first)
                .ToListAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }

  // Gets the users sent friend request that is pending
    public async Task<ICollection<User?>> GetPendingFriendRequests(string userId)
    {
        try 
        {
            return await _context.UserRelations
                .Where(
                    ur => (ur.User_first_ID == userId && ur.Type == UserRelationType.PENDING_FIRST_SECOND)
                    || (ur.User_second_ID == userId && ur.Type == UserRelationType.PENDING_SECOND_FIRST)
                )
                .Select(ur => ur.User_first_ID == userId ? ur.User_second : ur.User_first)
                .ToListAsync();
        }
         catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (UserRelationRepo)");
        }
    }
}