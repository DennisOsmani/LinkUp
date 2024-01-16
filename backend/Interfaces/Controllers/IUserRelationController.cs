using Microsoft.AspNetCore.Mvc;
using Models;

namespace Interfaces.Controllers;

/// <summary>
/// Controller Interface for updating UserRelations
/// </summary>
public interface IUserRelationController
{
    Task<ActionResult> UpdateUserRelationType([FromQuery] string userId, [FromQuery] string otherUserId, [FromQuery] string type);
}