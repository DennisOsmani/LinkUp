using System.ComponentModel.DataAnnotations;
using Enums;

namespace Models;

public class UserRelation
{
    [Key]
    public int UserRelationID { get; set; }
    public string User_first_ID { get; set; }
    public User? User_first { get; set; }
    public string User_second_ID { get; set; }
    public User? User_second { get; set; }
    public UserRelationType Type { get; set; }

    public UserRelation() {}

    public UserRelation(string user_first_id, string user_second_id, UserRelationType type)
    {
        User_first_ID = user_first_id;
        User_second_ID = user_second_id;
        Type = type;
    }
}