using Data;
using Models;

namespace Repositories;

/// <summary>
/// Repository for handling Location updates and manipulation to Locations table.
/// </summary>
public class LocationRepository
{
    public readonly AppDbContext _context;

    public LocationRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Location> UpdateLocation(Location oldLocation, Location newLocation)
    {
        try
        {
            oldLocation.Address = newLocation.Address;
            oldLocation.Postalcode = newLocation.Postalcode;
            oldLocation.City = newLocation.City;
            oldLocation.Country = newLocation.Country;

            await _context.SaveChangesAsync();
            return oldLocation;
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (LocationRepo)");
        }
    }

    public async Task<Location> CreateLocation(Location location)
    {
        try
        {
            _context.Add(location);
            await _context.SaveChangesAsync();

            return location;
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (LocationRepo)");
        }
    }

    public async Task DeleteLocation(Location location)
    {
        try
        {
            _context.Remove(location);
            await _context.SaveChangesAsync();
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (LocationRepo)");
        }
    }    

    public async Task<Location?> GetLocationByID(int locationId)
    {
        try
        {   
            return await _context.Locations.FindAsync(locationId);
        }
        catch(InvalidOperationException)
        {
            throw new InvalidOperationException($"Error with Linq query. (LocationRepo)");
        }
    }
}