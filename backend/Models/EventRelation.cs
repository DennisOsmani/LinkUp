namespace Models;

using System.ComponentModel.DataAnnotations;
using Enums;

public class EventRelation
{
    [Key]
    public int EventRelationID { get; set; }
    public Event EventID { get; set; }
    public User UserID { get; set; }
    public EventRelationType EventRelationType { get; set; }
    public EventRole EventRole { get; set; }

    public EventRelation(Event eventId, User userId, EventRelationType eventRelationType, EventRole eventRole) 
    {
        this.EventID = eventId;
        this.UserID = userId;
        this.EventRelationType = eventRelationType;
        this.EventRole = eventRole;
    }
}