using System.ComponentModel.DataAnnotations;
using Enums;

namespace Models;

public class UserRelation
{
    [Key]
    public int UserRelationId { get; set; }
    public int User_first_id { get; set; }
    public User? User_first { get; set; }
    public int User_second_id { get; set; }
    public User? User_second { get; set; }
    public UserRelationType Type { get; set; }

    public UserRelation(int user_first_id, int user_second_id, UserRelationType type)
    {
        this.User_first_id = user_first_id;
        this.User_second_id = user_second_id;
        this.Type = type;
    }
}