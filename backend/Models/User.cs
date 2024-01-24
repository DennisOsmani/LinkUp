using Enums;
using System.ComponentModel.DataAnnotations;
namespace Models;

public class User
{
    [Key]
    public string UserID { get; set; }
    public string? Username { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public DateTime? DateBorn { get; set; }
    public string? Phone { get; set; }
    public RelationshipStatus? RelationshipStatus { get; set; }
    public string? Gender { get; set; }
    public string? Description { get; set; }
    public string Email { get; set; }
    public string? ProfileImage { get; set; }
    public string? Password { get; set; }
    public string? Salt { get; set; }
    public int? EventsCreated { get; set; }
    public int? EventsJoined { get; set; }
    public int? EventBails { get; set; }
    public Role Role { get; set; }
    public ICollection<UserRelation>? UserRelations { get; set; }
    public ICollection<EventRelation>? EventRelations { get; set; }

    public User() {}

    public User(string userId, string firstname, string lastname, string email)
    {
        this.UserID = userId;
        this.Firstname = firstname;
        this.Lastname = lastname;
        this.Email = email;
        this.Role = Role.USER;  //bruuh

    }
}
