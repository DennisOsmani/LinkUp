using Models;
using Repositories;
using Interfaces;
using Enums;
using Microsoft.EntityFrameworkCore;

namespace Services;

public class UserService : IUserService
{
    public readonly UserRepository _userRepo;
    public readonly UserRepository _eventRepo;

    public UserService(UserRepository userRepo, EventRepository eventRepo)
    {
        this._userRepo = userRepo;
        this._eventRepo = eventRepo;
    }

    public async Task<User?> GetUser(string userId)
    {

        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("User ID cannot be null or empty.", nameof(userId));
        }

        User? user = await _userRepo.GetUserByID(userId);

        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID: {userId} not found in DB");
        }
        else
        {
            return user;
        }


    }

    public async Task<ICollection<User>> SearchUsers(string searchString)
    {
        try
        {
            return await _userRepo.SearchUsers(searchString);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in SearchUsers: {ex.Message}");
            throw;
        }
    }


    public async Task<User?> UpdateUser(string userId, User newUser)
    {
        if (newUser == null)
        {
            throw new ArgumentNullException("New user cannot be null.", nameof(newUser));
        }
        try
        {
            User? user = await GetUser(userId);
            return await _userRepo.UpdateUser(user, newUser);
        }
        catch (KeyNotFoundException)
        {
            throw new KeyNotFoundException($"Error in updating user. User with ID: {userId} not found in DB");
        }
    }


    public async Task DeleteUser(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentException("User ID cannot be null or empty.", nameof(userId));
        }

        try
        {
            User? user = await GetUser(userId);
            _userRepo.DeleteUser(user);
        }
        catch (KeyNotFoundException)
        {
            throw new KeyNotFoundException($"Error in deleting user. User with ID: {userId} not found in DB");
        }

    }

    //probably needs an update, need eventrepo/service access first
    public async Task<ICollection<User>> GetUsersFromEvent(int eventId)
    {

        Event ? event = await _eventRepo.getEventByID(eventId);
        if(event == null)
        {
        throw new KeyNotFoundException($"GetUsersFromEvent: Event with ID: {eventId} not found in DB");
    }
        return await _userRepo.GetUsersFromEvent(eventId);
    }
}