using Microsoft.AspNetCore.Mvc;

namespace Interfaces.Controllers;

/// <summary>
/// Controller Interface for updating EventRelations
/// </summary>
public interface IEventRelationController
{
    Task<ActionResult> UpdateEventRelationType([FromQuery] string eventId, [FromQuery] string userId, [FromQuery] string type);

    Task<ActionResult> UpdateEventRelationRole([FromQuery] string eventId, [FromQuery] string userId, [FromQuery] string role);
}