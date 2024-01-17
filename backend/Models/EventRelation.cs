namespace Models;

using System.ComponentModel.DataAnnotations;
using Enums;

public class EventRelation
{
    [Key]
    public int EventRelationID { get; set; }
    public int EventID { get; set; }
    public Event? Event { get; set; }
    public string UserID { get; set; }
    public User? User { get; set; }
    public EventRelationType EventRelationType { get; set; }
    public EventRole EventRole { get; set; }

    public EventRelation(int eventId, string userId, EventRelationType eventRelationType, EventRole eventRole) 
    {
        this.EventID = eventId;
        this.UserID = userId;
        this.EventRelationType = eventRelationType;
        this.EventRole = eventRole;
    }
}