using Microsoft.AspNetCore.Mvc;

namespace Interfaces;

/// <summary>
/// Service Interface for updating UserRelations
/// </summary>
public interface IUserRelationService
{
    Task UpdateUserRelationType([FromQuery] string userId, [FromQuery] string otherUserId, [FromQuery] string type);
}