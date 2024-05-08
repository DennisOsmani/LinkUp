using System.Security;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers;

[ApiController]
[Route("api/location")]
public class LocationController : ControllerBase
{
    public readonly LocationService _locationService;

    public LocationController(LocationService locationService)
    {
        _locationService = locationService;
    }

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

    [HttpPut]
    public async Task<ActionResult<Location>> UpdateLocation([FromBody] Location location)
    {
        try
        {
            Location? updatedLocation = await _locationService.UpdateLocation(location);
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

    [HttpDelete("{locationId}")]
    public async Task<ActionResult> DeleteLocation(int locationId)
    {
        try
        {
            await _locationService.DeleteLocation(locationId);
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