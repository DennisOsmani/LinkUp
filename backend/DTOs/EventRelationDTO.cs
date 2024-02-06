using Enums;

namespace DTOs;

public class EventRelationDTO
{
    public int EventID { get; set; }
    public string UserID { get; set; }
    public EventRelationParticipation EventRelationParticipation { get; set; }
    public EventRole EventRole { get; set; }

    public EventRelationDTO(int eventId, string userId, EventRelationParticipation eventRelationParticipation, EventRole eventRole)
    {
        EventID = eventId;
        UserID = userId;
        EventRelationParticipation = eventRelationParticipation;
        EventRole = eventRole;
    }
}