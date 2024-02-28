using Models;
using Repositories;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Exceptions;
using Enums;

namespace Services;

public class UserService : IUserService
{
    public readonly UserRepository _userRepo;
    public readonly EventRepository _eventRepo;
    public readonly EventRelationRepository _eventRelRepo;
    public readonly UserRelationRepository _userRelRepo;

    public UserService(UserRepository userRepo, EventRepository eventRepo, EventRelationRepository eventRelRepo, UserRelationRepository userRelRepo)
    {
        _userRepo = userRepo;
        _eventRepo = eventRepo;
        _eventRelRepo = eventRelRepo;
        _userRelRepo = userRelRepo;
    }

    public async Task<User?> FindByEmailAsync(string email)
    {
        return await _userRepo._context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetUser(string userId)
    {

        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentNullException("User ID cannot be null or empty. " + nameof(userId) + " (UserService)");
        }

        User? user = await _userRepo.GetUserByID(userId);

        if (user == null)
        {
            throw new KeyNotFoundException($"User with UserID: {userId}, does not exist! (UserService)");
        }

        user.Password = "Ikke faen mann";
        user.Salt = "Mordi er tjukk";
        return user;
    }

    public async Task CreateUser(User user)
    {
        string id = Guid.NewGuid().ToString();
        User? doesUserExist = await _userRepo.GetUserByID(id);

        while (doesUserExist != null)
        {
            id = Guid.NewGuid().ToString();
            doesUserExist = await _userRepo.GetUserByID(id);
        }

        bool emailExists = await _userRepo.DoesEmailExist(user.Email);
        if (emailExists)
        {
            throw new EmailAlreadyExistException(user.Email);
        }

        user.UserID = id;

        await _userRepo.CreateUser(user);
    }

    public async Task<User?> UpdateUser(string userId, User updatedUser)
    {
        if (updatedUser == null)
        {
            throw new ArgumentNullException("New user cannot be null. " + nameof(updatedUser) + " (UserService)");
        }

        return await _userRepo.UpdateUser(userId, updatedUser);
    }

    public async Task DeleteUser(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentNullException("User ID cannot be null or empty. " + nameof(userId) + " (UserService)");
        }
        
        User? user = await GetUser(userId);

        ICollection<Event?> eventsJoined = await _eventRepo.GetUserJoinedEvents(userId);

        ICollection<Event?> eventsCreated = eventsJoined.Where(e => e.EventRelations.Any(er => er.EventRole == EventRole.CREATOR)).ToList();

        foreach (var eventt in eventsCreated)
        {
            await _eventRepo.DeleteEvent(eventt);
        }

        ICollection<UserRelation> userRelations = await _userRelRepo.GetAllUsersRelations(userId);

        foreach (var ur in userRelations)
        {
            await _userRelRepo.DeleteUserRelation(ur);
        }

        await _userRepo.DeleteUser(user);
    }

    public async Task<ICollection<User>> SearchUsers(string searchString)
    {
        return await _userRepo.SearchUsers(searchString);
    }

    //probably needs an update, need eventrepo/service access first
    public async Task<ICollection<User>> GetUsersFromEvent(int eventId)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with EventID: {eventId}, does not exist! (UserService)");
        }
        return await _userRepo.GetUsersFromEvent(eventId);
    }
}