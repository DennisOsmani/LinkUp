using Enums;
namespace Models;

//TODO:
//fix warnings with nullability and constuctor, add relation tables, see over ENUM configuration, ENUM for relationship status? Key, length etc. add

public class User
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string Firstname { get; set; }
    public DateTime DateBorn { get; set; }
    public string Phone { get; set; }
    public string RelationshipStatus { get; set; }
    public string Gender { get; set; }
    public string Description { get; set; }
    public string Email { get; set; }
    public string ProfileImage { get; set; }
    public string Password { get; set; }
    public string Salt { get; set; }
    public int EventsCreated { get; set; }
    public int EventsJoined { get; set; }
    public int EventBails { get; set; }
    public Role Role { get; set; }

    public User(string UserId)
    {
        this.UserId = UserId;

    }
}
