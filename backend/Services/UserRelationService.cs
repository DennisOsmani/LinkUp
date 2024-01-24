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
        this._userRelationRepo = userRelationRepo;
        this._userRepo = userRepo;
    }

    public async Task<UserRelation?> CreateUserRelation(string userId, string otherUserId, string type)
    {
        User? user = await _userRepo.GetUserByID(userId);
        User? otherUser = await _userRepo.GetUserByID(otherUserId);

        if(user == null || otherUser == null)
        {
            // throw exception
            return null;
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

    public async Task<UserRelation?> UpdateUserRelationType(string userId, string otherUserId, string type)
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

        // Throw exception

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
            default:
                urtype = UserRelationType.PENDING_FIRST_SECOND;
                break;
        }

        return urtype;
    }

}