using Data;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Repositories;

public class UserRelationRepository : IUserRelationService
{
    public readonly AppDbContext _context;

    public UserRelationRepository(AppDbContext context)
    {
        this._context = context;
    }

    public async Task<List<UserRelation>> GetUserRelations([FromQuery] string userId, [FromQuery] string type)
    {
        throw new NotImplementedException();
    }

    public async Task<UserRelation> UpdateUserRelationType([FromQuery] string userId, [FromQuery] string otherUserId, [FromQuery] string type)
    {
        throw new NotImplementedException();
    }
}