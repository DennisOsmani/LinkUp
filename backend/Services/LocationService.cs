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

    public async Task<Location> GetLocation(int locationId)
    {
        Location? location = await _locationRepo.GetLocationByID(locationId);
        if (location == null)
        {
            throw new KeyNotFoundException($"Location with locationId: {locationId}, was not found! (LocationService)");
        }
        return location;
    }

    public async Task<Location> UpdateLocation(Location newLocation)
    {
        Location? oldLocation = await _locationRepo.GetLocationByID(newLocation.LocationID);

        if (oldLocation == null)
        {
            throw new KeyNotFoundException($"Location with locationId: {newLocation.LocationID}, was not found! (LocationService)");
        }

        return await _locationRepo.UpdateLocation(oldLocation, newLocation);
    }

    public async Task<Location> CreateLocation(int eventId, Location location)
    {
        Event? eventt = await _eventRepo.GetEventByID(eventId);

        if (eventt == null)
        {
            throw new KeyNotFoundException($"Event with locaitonId: {eventId}, was not found! (LocationService)");
        }

        return await _locationRepo.CreateLocation(location);
    }

    public async Task DeleteLocation(int locationId)
    {
        Location? location = await _locationRepo.GetLocationByID(locationId);

        if (location == null)
        {
            throw new KeyNotFoundException($"Location with locationId: {locationId}, was not found! (LocationService)");
        }

        await _locationRepo.DeleteLocation(location);
    }
}