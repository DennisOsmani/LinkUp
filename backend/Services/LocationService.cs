using Repositories;
using Models;

namespace Services;

public class LocationService
{
    public readonly LocationRepository _locationRepo;
    public readonly EventRepository _eventRepo;

    public LocationService(LocationRepository locationRepo, EventRepository eventRepo)
    {
        _locationRepo = locationRepo;
        _eventRepo = eventRepo;
    }

    public async Task<Location> UpdateLocation(string locationId, Location newLocation)
    {
        int locationIdInteger;

        try
        {
            locationIdInteger = int.Parse(locationId);
        }
        catch(FormatException)
        {
            throw new FormatException($"Failed to parse locationId: ${locationId}, to Integer");
        }

        Location? oldLocation = await _locationRepo.GetLocationByID(locationIdInteger);

        if(oldLocation == null)
        {
            throw new KeyNotFoundException($"Location with locationId: {locationId}, was not found!");
        }

        return await _locationRepo.UpdateLocation(oldLocation, newLocation);
    }

    public async Task<Location> CreateLocation(string eventId, Location location)
    {
        Event? eventt = await _eventRepo.FindEventByID(eventId);

        if(eventt == null)
        {
            throw new KeyNotFoundException($"Location with eventId: {eventId}, was not found!");
        }

        return await _locationRepo.CreateLocation(location);
    }

    public async Task DeleteLocation(string locationId)
    {
        int locationIdInteger;

        try
        {
            locationIdInteger = int.Parse(locationId);
        }
        catch(FormatException)
        {
            throw new FormatException($"Failed to parse locationId: ${locationId}, to Integer");
        }

        Location? location = await _locationRepo.GetLocationByID(locationIdInteger);

        if(location == null)
        {
            throw new KeyNotFoundException($"Location with locationId: {locationId}, was not found!");
        }

        await _locationRepo.DeleteLocation(location);
    }    
}