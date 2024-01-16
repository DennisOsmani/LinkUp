using Microsoft.AspNetCore.Mvc;

namespace Interfaces;

/// <summary>
/// Service Interface for updating EventRelations
/// </summary>
public interface IEventRelationService
{
    Task UpdateEventRelationType([FromQuery] string eventId, [FromQuery] string userId, [FromQuery] string type);

    Task UpdateEventRelationRole([FromQuery] string eventId, [FromQuery] string userId, [FromQuery] string role);
}