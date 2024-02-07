using System.ComponentModel.DataAnnotations;

namespace Models;

public class Location
{
    [Key]
    public int LocationID { get; set; }
    public string? Address { get; set; }
    public string? Postalcode { get; set; }
    public string City { get; set; }
    public string Country { get; set; }

    public Location() {}

    public Location(string city, string country)
    {
        City = city;
        Country = country;
    }
}