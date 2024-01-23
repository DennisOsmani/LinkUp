using Microsoft.AspNetCore.Mvc;
using Services;
using Models;

namespace Controllers;

[ApiController]
[Route("api/userrelation")]
public class UserRelationController : ControllerBase
{
    public readonly UserRelationService _urService;

    public UserRelationController(UserRelationService urService)
    {
        _urService = urService;
    }

    [HttpPut("/update")]
    public async Task<IActionResult> UpdateUserRelationType([FromQuery] string userId, [FromQuery] string otherUserId, [FromQuery] string type)
    {
        UserRelation updatedUserRelation;

        try
        {
            updatedUserRelation = await _urService.UpdateUserRelationType();
        }
        catch(Exception e)
        {

        }
    }

    [HttpPost("/create")]
    public async Task<IActionResult> CreateUserRelation([FromQuery] string userId, [FromQuery] string otherUserId, [FromQuery] string type)
    {
        try
        {

        }
        catch(Exception e)
        {

        }
    }
}