using Models;
using Repositories;
using Interfaces;

namespace Services;

public class UserService : IUserService
{
    public readonly UserRepository _userRepo;
    public readonly EventRepository _eventRepo;

    public UserService(UserRepository userRepo, EventRepository eventRepo)
    {
        _userRepo = userRepo;
        _eventRepo = eventRepo;
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

        return user;
    }

    public async Task CreateUser(User user)
    {
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        //  DENNE MÅ FINNE OG OPRETTE EN UserID (ev bruke UUID), og sjekke om username finnes eller ikke
        /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
        try
        {
            await _userRepo.CreateUser(user);
        }
        catch(InvalidOperationException)
        {
            
        }
    }

    public async Task<User?> UpdateUser(string userId, User newUser)
    {
        if (newUser == null)
        {
            throw new ArgumentNullException("New user cannot be null. "+ nameof(newUser)+ " (UserService)");
        }
 
        User? user = await GetUser(userId);
        return await _userRepo.UpdateUser(user, newUser);
    }

    public async Task DeleteUser(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            throw new ArgumentNullException("User ID cannot be null or empty. " + nameof(userId) + " (UserService)");
        }

        User? user = await GetUser(userId);
        await _userRepo.DeleteUser(user);
    }

    public async Task<ICollection<User>> SearchUsers(string searchString)
    {
        return await _userRepo.SearchUsers(searchString);
    }

    //probably needs an update, need eventrepo/service access first
    public async Task<ICollection<User>> GetUsersFromEvent(int eventId)
    {
        Event ? eventt = await _eventRepo.GetEventByID(eventId);

        if(eventt == null)
        {
            throw new KeyNotFoundException($"Event with EventID: {eventId}, does not exist! (UserService)");
        }
        return await _userRepo.GetUsersFromEvent(eventId);
    }
}