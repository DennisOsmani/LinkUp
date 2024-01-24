namespace Models;
using System.ComponentModel.DataAnnotations;

public class Location
{
    [Key]
    public int LocationID { get; set; }
    public int EventID { get; set; }
    public Event? Event { get; set; }
    public string Address { get; set; }
    public string Postalcode { get; set; }
    public string City { get; set; }
    public string Country { get; set; }

    public Location() {}

    public Location(int eventId, string address, string postalcode, string city, string country) 
    {
        this.EventID = eventId;
        this.Address = address;
        this.Postalcode = postalcode;
        this.City = city;
        this.Country = country;
    }
}