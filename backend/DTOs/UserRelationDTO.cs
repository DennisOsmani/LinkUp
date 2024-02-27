using Enums;

namespace DTOs;

public class UserRelationDTO
{
    public string? UserID { get; set; }
    public string? OtherUserId { get; set; }
    public UserRelationType? Type { get; set; }
}