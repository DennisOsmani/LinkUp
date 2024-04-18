using Enums;

namespace DTOs;

public class UserWithEventParticipationDTO
{
    public string UserID { get; set; }
    public string ImageUrl { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public DateTime? DateBorn { get; set; }
    public EventRelationParticipation Participation { get; set; }
    public EventRole Role { get; set; }

    public UserWithEventParticipationDTO(string userId, string imageUrl, string firstname, string lastname, DateTime? dateBorn, EventRelationParticipation participation, EventRole role)
    {
        UserID = userId;
        ImageUrl = imageUrl;
        Firstname = firstname;
        Lastname = lastname;
        DateBorn = dateBorn;
        Participation = participation;
        Role = role;
    }
}
