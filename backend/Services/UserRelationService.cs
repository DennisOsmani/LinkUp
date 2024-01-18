using Models;
using Repositories;
using Interfaces;
using Enums;
using System.Reflection.Metadata.Ecma335;

namespace Services;

public class UserRelationService : IUserRelationService
{
    public readonly UserRelationRepository _userRelationRepo;
    public readonly UserRepository _userRepo;

    public UserRelationService(UserRelationRepository userRelationRepo, UserRepository userRepo)
    {
        this._userRelationRepo = userRelationRepo;
        this._userRepo = userRepo;
    }

    public async Task<UserRelation?> CreateUserRelationType(string userId, string otherUserId, string type)
    {
        // Does the users exist?
        User? user = await _userRepo.GetUserByID(userId);
        User? otherUser = await _userRepo.GetUserByID(otherUserId);

        if(user == null || otherUser == null)
        {
            return null;
        }

        // Does a userrelation exist? 
        UserRelation? userRelationOne = await _userRelationRepo.GetUserRelation(userId, otherUserId);
        UserRelation? userRelationTwo = await _userRelationRepo.GetUserRelation(otherUserId, userId);

        if(userRelationOne != null)
        {
            await _userRelationRepo.DeleteUserRelation(userRelationOne);
        }

        if(userRelationTwo != null)
        {
            await _userRelationRepo.DeleteUserRelation(userRelationTwo);
        }

        UserRelation createdUserRelation = await _userRelationRepo.CreateUserRelaton(new UserRelation(userId, otherUserId, UserRelationType.PENDING_FIRST_SECOND));

        return createdUserRelation;
    }

    public async Task<ICollection<UserRelation>> GetUserRelations(string userId, string type)
    {
        UserRelationType urtype = StringToUserRelationTypeEnum(type);

        return await _userRelationRepo.GetUserRelations(userId, urtype);
    }

    public async Task<UserRelation?> UpdateUserRelationType(string userId, string otherUserId, string type)
    {
        UserRelation? userRelationOne = await _userRelationRepo.GetUserRelation(userId, otherUserId);
        UserRelation? userRelationTwo = await _userRelationRepo.GetUserRelation(otherUserId, userId);
        
        UserRelationType enumType = StringToUserRelationTypeEnum(type);

        if(userRelationOne != null)
        {
            return await _userRelationRepo.UpdateUserRelationType(userRelationOne, enumType);
        }

        if(userRelationTwo != null)
        {
            return await _userRelationRepo.UpdateUserRelationType(userRelationTwo, enumType);
        }

        return null;
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
            case "BLOCKED_BOTH":
                urtype = UserRelationType.BLOCKED_BOTH;
                break;
            default:
                urtype = UserRelationType.PENDING_FIRST_SECOND;
                break;
        }

        return urtype;
    }
}