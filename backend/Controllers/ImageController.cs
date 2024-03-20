using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs.Models;

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
        public async Task<IActionResult> Upload()
        {
            Console.WriteLine("FORM RECEIVED!");

            // Assume a default content type if none is provided, or derive it from other sources if possible
            string contentType = Request.ContentType ?? "application/octet-stream";

            // Determine a file name. Here, using a GUID for simplicity. Adjust based on your requirements.
            var fileName = $"{Guid.NewGuid()}.jpeg"; // Change the extension based on your actual content type or logic

            string connectionString = _configuration["AzureStorageConfig:ConnectionString"];
            var blobServiceClient = new BlobServiceClient(connectionString);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient("userimages");
            await blobContainerClient.CreateIfNotExistsAsync();

            var blobClient = blobContainerClient.GetBlobClient(fileName);

            // Read the request body directly as the blob stream
            await blobClient.UploadAsync(Request.Body, new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = contentType }
            });

            // Construct the URL to access the uploaded blob
            var blobUrl = blobClient.Uri.AbsoluteUri;
            return Ok(blobUrl);

        }
    }
}
