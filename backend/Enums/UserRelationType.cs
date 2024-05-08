namespace Enums;

/// <summary>
/// Enum for the Type of relation between two users in UserRelation
/// </summary>
public enum UserRelationType
{
    PENDING_FIRST_SECOND,
    PENDING_SECOND_FIRST,
    FRIENDS,
    BLOCKED_FIRST_SECOND,
    BLOCKED_SECOND_FIRST,
}