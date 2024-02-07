using System.Security;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

/// <summary>
/// Controller to manage locations.
/// </summary>
[ApiController]
[Route("api/location")]
public class LocationController : ControllerBase
{
    public readonly LocationService _locationService;

    public LocationController(LocationService locationService)
    {
        _locationService = locationService;
    }

    /// <summary>
    /// Retrieves a location by its ID.
    /// </summary>
    /// <param name="locationId">The ID of the location to retrieve.</param>
    /// <returns>The location information if found.</returns>
    [HttpGet("{locationId}")]
    public async Task<ActionResult<Location>> GetLocation(int locationId)
    {
        try
        {
            Location? location = await _locationService.GetLocation(locationId);
            return Ok(location);
        }

        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    /// <summary>
    /// Updates a location with the given ID.
    /// </summary>
    /// <param name="locationId">The ID of the location to update.</param>
    /// <param name="location">The updated location information.</param>
    /// <returns>The updated location information.</returns>
    [HttpPut("{locationId}")]
    public async Task<ActionResult<Location>> UpdateLocation(int locationId, [FromBody] Location location)
    {
        try
        {
            Location? updatedLocation = await _locationService.UpdateLocation(locationId, location);
            return Ok(updatedLocation);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    /// <summary>
    /// Creates a new location. Probably not needed/impossible to use? should maybe
    /// use the service method in the CreateEvent api insted, if not done already
    /// </summary>
    /// <param name="eventId">The ID of the event associated with the location.</param>
    /// <param name="location">The location information to create.</param>
    /// <returns>The newly created location information.</returns>
    [HttpPost]
    public async Task<ActionResult> CreateLocation([FromQuery] int eventId, [FromBody] Location location)
    {
        try
        {
            await _locationService.CreateLocation(eventId, location);
            return CreatedAtAction(nameof(GetLocation), new { locationId = location.LocationID }, location);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    /// <summary>
    /// Deletes a location by its ID. Probably not needed because of the cascade functionality
    /// of the tables in the app :) made it even tho, because i love to work
    /// </summary>
    /// <param name="locationId">The ID of the location to delete.</param>
    /// <returns>No content if the location is deleted successfully.</returns>
    [HttpDelete("{locationId}")]
    public async Task<ActionResult> DeleteLocation(int locaitonId)
    {
        try
        {
            await _locationService.DeleteLocation(locaitonId);
            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

}