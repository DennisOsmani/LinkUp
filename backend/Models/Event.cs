namespace Models;
using System.ComponentModel.DataAnnotations;
using Enums;
public class Event
{
    [Key]
    public int EventID { get; set; }
    public string CreatorUserID { get; set; }
    public User? Useer { get; set; }
    public string EventName { get; set; }
    public string EventDescription { get; set; }
    public DateTime EventDateTimeStart { get; set; }
    public DateTime EventDateTimeEnd { get; set; }
    public Visibility Visibility { get; set; }
    public string InviteURL { get; set; }
    public string? FrontImage { get; set; }
    public string? MinCapacity { get; set; }
    public string? MaxCapacity { get; set; }
    public Location? Location { get; set; }

    public Event(string creatorUserID, string eventName, string eventDescription, 
        DateTime eventDateTimeStart, DateTime eventDateTimeEnd, string inviteURL)
{
    this.CreatorUserID = creatorUserID;
    this.EventName = eventName;
    this.EventDescription = eventDescription;
    this.EventDateTimeStart = eventDateTimeStart;
    this.EventDateTimeEnd = eventDateTimeEnd;
    this.InviteURL = inviteURL;
}
}   