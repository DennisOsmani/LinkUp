using Data;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories;

public class LocationRepository
{
    public readonly AppDbContext _context;

    public LocationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Location> UpdateLocation(Location oldLocation, Location newLocation)
    {
        oldLocation.EventID = newLocation.EventID;
        oldLocation.Address = newLocation.Address;
        oldLocation.Postalcode = newLocation.Postalcode;
        oldLocation.City = newLocation.City;
        oldLocation.Country = newLocation.Country;

        await _context.SaveChangesAsync();
        return oldLocation;
    }

    public async Task<Location> CreateLocation(Location location)
    {
        _context.Add(location);
        await _context.SaveChangesAsync();

        return location;
    }

    public async Task DeleteLocation(Location location)
    {
        _context.Remove(location);
        await _context.SaveChangesAsync();
    }    

    public async Task<Location?> GetLocationByID(int locationId)
    {
        return await _context.Locations.FindAsync(locationId);
    }
}