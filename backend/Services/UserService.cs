using Models;
using Repositories;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using Exceptions;

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
        return await _userRepo._context.Users.FirstOrDefaultAsync(u => u.Email.ToUpper() == email.ToUpper());
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

        user.Password = "";
        user.Salt = "";
        return user;
    }

    public async Task<ICollection<User?>> GetUserFriends(string userId)
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

        return await _userRelRepo.GetUserFriends(user.UserID);
    }

    public async Task<ICollection<User>> GetFriendsNotInvited(string userId, int eventId)
    {
        User? user = await _userRepo.GetUserByID(userId);

        if (user == null)
        {
            throw new KeyNotFoundException($"User with UserID: {userId}, does not exist! (UserService)");
        }

        Event? eventt = await _eventRepo.GetEventByID(eventId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with EventID: {eventId}, does not exist! (UserService)");
        }

        ICollection<User> usersFromEvent = await _userRepo.GetUsersFromEvent(eventId);
        ICollection<User?> friends = await _userRelRepo.GetUserFriends(userId);

        if (!friends.Any())
            return new List<User>();

        ICollection<User> friendsNotInvited = friends
            .Where(friend => !usersFromEvent.Any(ue => ue.UserID == friend.UserID))
            .ToList();

        return friendsNotInvited;
    }

    public async Task<ICollection<User?>> GetPendingFriendRequests(string userId)
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

        return await _userRelRepo.GetPendingFriendRequests(user.UserID);
    }

    public async Task<ICollection<User?>> GetUserFriendRequests(string userId)
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

        return await _userRelRepo.GetUserFriendRequests(user.UserID);
    }

    public async Task<ICollection<User?>> GetUserBlocks(string userId)
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

        return await _userRelRepo.GetUserBlocks(userId);
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

        ICollection<Event?> eventsCreated = await _eventRepo.GetCreatedEvents(userId);

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

    public async Task<ICollection<User>> SearchUsers(string searchString, string userId)
    {
        ICollection<User?> usersBlocked = await _userRelRepo.GetUsersBlockedLoggedInUser(userId);

        ICollection<User> searchedUsers = await _userRepo.SearchUsers(searchString);

        foreach (var blockedUser in usersBlocked)
        {
            searchedUsers = searchedUsers.Where(user => user.UserID != blockedUser?.UserID).ToList();
        }

        return searchedUsers;
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
