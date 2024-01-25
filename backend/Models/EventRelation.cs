namespace Models;

using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Tracing;
using Enums;

public class EventRelation
{
    [Key]
    public int EventRelationID { get; set; }
    public int EventID { get; set; }
    public Event Event { get; set; }
    public string UserID { get; set; }
    public User? User { get; set; }
    public EventRelationParticipation EventRelationParticipation { get; set; }
    public EventRole EventRole { get; set; }

    public EventRelation() {}

    public EventRelation(int eventId, Event eventt, string userId, EventRelationParticipation eventRelationParticipation, EventRole eventRole) 
    {
        EventID = eventId;
        Event = eventt;
        UserID = userId;
        EventRelationParticipation = eventRelationParticipation;
        EventRole = eventRole;
    }
}