using Models;
using Repositories;
using Interfaces;
using Enums;
using Microsoft.EntityFrameworkCore;

namespace Services;

public class UserService : IUserService
{
    public readonly UserRepository _userRepo;

    public UserService(UserRepository userRepo)
    {
        this._userRepo = userRepo;
    }

    public async Task<User?> GetUser(string userId)
    {
        try
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.", nameof(userId));
            }

            return await _userRepo.GetUserByID(userId);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetUser: {ex.Message}");
            throw;
        }
    }

    public async Task DeleteUser(string userId)
    {
        try
        {
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.", nameof(userId));
            }

            await _userRepo.DeleteUser(userId);

        }
        catch (DbUpdateConcurrencyException ex)
        {
            Console.WriteLine($"Concurrency conflict in DeleteUser: {ex.Message}");
            throw;
        }
    }

    public async Task<User?> UpdateUser(User user)
    {
        try
        {
            if (user == null)
            {
                throw new ArgumentNullException("User cannot be null.", nameof(user));
            }
            return await _userRepo.UpdateUser(user);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in UpdateUser: {ex.Message}");
            return null;
        }
    }

    public async Task<ICollection<User>> GetUsersFromEvent(string eventId)
    {
        try
        {
            if (string.IsNullOrEmpty(eventId) || !int.TryParse(eventId, out int parsedEventId))
            {
                throw new ArgumentException("Invalid Event ID.", nameof(eventId));
            }

            return await _userRepo.GetUsersFromEvent(parsedEventId);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetUsersFromEvent: {ex.Message}");
            throw;
        }
    }

    public async Task<ICollection<User>> SearchUsers(string fullName)
    {
        try
        {
            return await _userRepo.SearchUsers(fullName);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in SearchUsers: {ex.Message}");
            throw;
        }
    }


}