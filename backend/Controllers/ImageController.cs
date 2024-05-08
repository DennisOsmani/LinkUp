using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace YourNamespace
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UploadController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize(Roles = "USER,ADMIN,SUPERADMIN")]
        public async Task<IActionResult> Upload()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized("No user ID claim present in token.");
            }

            string contentType = Request.ContentType ?? "application/octet-stream";
            var fileName = $"{Guid.NewGuid()}.jpeg"; 

            string connectionString = _configuration["AzureStorageConfig:ConnectionString"];
            var blobServiceClient = new BlobServiceClient(connectionString);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient("userimages");
            await blobContainerClient.CreateIfNotExistsAsync();

            var blobClient = blobContainerClient.GetBlobClient(fileName);

            await blobClient.UploadAsync(Request.Body, new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = contentType }
            });

            var blobUrl = blobClient.Uri.AbsoluteUri;
            return Ok(blobUrl);

        }
    }
}
