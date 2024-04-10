using Models;
using Repositories;
using Interfaces;
using Enums;

namespace Services;

public class UserRelationService : IUserRelationService
{
    public readonly UserRelationRepository _userRelationRepo;
    public readonly UserRepository _userRepo;

    public UserRelationService(UserRelationRepository userRelationRepo, UserRepository userRepo)
    {
        _userRelationRepo = userRelationRepo;
        _userRepo = userRepo;
    }

    public async Task<UserRelation?> GetUserRelation(string userId, string otherUserId) {
        User? user = await _userRepo.GetUserByID(userId);
        User? otherUser = await _userRepo.GetUserByID(otherUserId);

        if(user == null)
        {
            throw new KeyNotFoundException($"User with UserID: {userId}, does not exist! (UserRelationService)");
        }

        if(otherUser == null)
        {
            throw new KeyNotFoundException($"User with UserID: {otherUserId}, does not exist! (UserRelationService)");
        }

        UserRelation relation = await _userRelationRepo.GetUserRelation(userId, otherUserId);

        Console.WriteLine("Relasjon id" + relation.UserRelationID + " type: " + relation.Type +
        " 1: " + relation.User_first_ID + 
        " 2: " + relation.User_second_ID + 
        " Brukere: " + user.UserID + " " + otherUser.UserID);

        return relation;
    }   

    public async Task<UserRelation> CreateUserRelation(string userId, string otherUserId, string type)
    {
        User? user = await _userRepo.GetUserByID(userId);
        User? otherUser = await _userRepo.GetUserByID(otherUserId);

        if(user == null)
        {
            throw new KeyNotFoundException($"User with UserID: {userId}, does not exist! (UserRelationService)");
        }

        if(otherUser == null)
        {
            throw new KeyNotFoundException($"User with UserID: {otherUserId}, does not exist! (UserRelationService)");
        }

        UserRelation? userRelationOne = await _userRelationRepo.GetOneUserRelation(userId, otherUserId);
        UserRelation? userRelationTwo = await _userRelationRepo.GetOneUserRelation(otherUserId, userId);

        if(userRelationOne != null)
        {
            await _userRelationRepo.DeleteUserRelation(userRelationOne);
        }

        if(userRelationTwo != null)
        {
            await _userRelationRepo.DeleteUserRelation(userRelationTwo);
        }

        UserRelationType userRelationType = StringToUserRelationTypeEnum(type);

        UserRelation createdUserRelation = await _userRelationRepo.CreateUserRelaton(new UserRelation(userId, otherUserId, userRelationType));

        return createdUserRelation;
    }

    public async Task<UserRelation> UpdateUserRelationType(string userId, string otherUserId, string type)
    {
        UserRelation? userRelationOne = await _userRelationRepo.GetOneUserRelation(userId, otherUserId);
        UserRelation? userRelationTwo = await _userRelationRepo.GetOneUserRelation(otherUserId, userId);
        
        UserRelationType enumType = StringToUserRelationTypeEnum(type);

        if(userRelationOne != null)
        {
            return await _userRelationRepo.UpdateUserRelationType(userRelationOne, enumType);
        }

        if(userRelationTwo != null)
        {
            return await _userRelationRepo.UpdateUserRelationType(userRelationTwo, enumType);
        }

        throw new KeyNotFoundException($"UserRelation with userIDs: {userId} and {otherUserId}, does not exist! (UserRelationService)");
    }

    public async Task DeleteUserRelation(string userId, string otherUserId)
    {
        UserRelation? userRelationOne = await _userRelationRepo.GetOneUserRelation(userId, otherUserId);
        UserRelation? userRelationTwo = await _userRelationRepo.GetOneUserRelation(otherUserId, userId);
        
        if(userRelationOne == null && userRelationTwo == null)
        {
            throw new KeyNotFoundException($"UserRelation with IDS: {userId} and {otherUserId}, does not exist! (UserRelationService)");
        }

        if(userRelationOne != null)
        {
            await _userRelationRepo.DeleteUserRelation(userRelationOne);
        }

        if(userRelationTwo != null)
        {
            await _userRelationRepo.DeleteUserRelation(userRelationTwo);
        }
    }

    public UserRelationType StringToUserRelationTypeEnum(string type)
    {
        UserRelationType urtype;

        switch(type)
        {
            case "PENDING_FIRST_SECOND":
                urtype = UserRelationType.PENDING_FIRST_SECOND;
                break;
            case "PENDING_SECOND_FIRST":
                urtype = UserRelationType.PENDING_SECOND_FIRST;
                break;
            case "FRIENDS":
                urtype = UserRelationType.FRIENDS;
                break;
            case "BLOCKED_FIRST_SECOND":
                urtype = UserRelationType.BLOCKED_FIRST_SECOND;
                break;
            case "BLOCKED_SECOND_FIRST":
                urtype = UserRelationType.BLOCKED_SECOND_FIRST;
                break;
            default:
                urtype = UserRelationType.PENDING_FIRST_SECOND;
                break;
        }

        return urtype;
    }
}