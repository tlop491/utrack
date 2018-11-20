using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MSA.Helpers;
using MSA.Models;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.Extensions.Configuration;

namespace MSA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentItemController : ControllerBase
    {
        private readonly MSAContext _context;
        private IConfiguration _configuration;

        public DocumentItemController(MSAContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/DocumentItem
        [HttpGet]
        public IEnumerable<DocumentItem> GetDocumentItem()
        {
            return _context.DocumentItem;
        }

        // GET: api/DocumentItem/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDocumentItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var documentItem = await _context.DocumentItem.FindAsync(id);

            if (documentItem == null)
            {
                return NotFound();
            }

            return Ok(documentItem);
        }

        // PUT: api/DocumentItem/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocumentItem([FromRoute] int id, [FromBody] DocumentItem documentItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != documentItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(documentItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DocumentItem
        [HttpPost]
        public async Task<IActionResult> PostDocumentItem([FromBody] DocumentItem documentItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.DocumentItem.Add(documentItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDocumentItem", new { id = documentItem.Id }, documentItem);
        }

        // DELETE: api/DocumentItem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocumentItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var documentItem = await _context.DocumentItem.FindAsync(id);
            if (documentItem == null)
            {
                return NotFound();
            }

            _context.DocumentItem.Remove(documentItem);
            await _context.SaveChangesAsync();

            return Ok(documentItem);
        }

        private bool DocumentItemExists(int id)
        {
            return _context.DocumentItem.Any(e => e.Id == id);
        }

        // GET: api/DocumentItem/Tags
        [Route("tags")]
        [HttpGet]
        public async Task<List<string>> GetTags()
        {
            var documents = (from m in _context.DocumentItem
                         select m.Tags).Distinct();

            var returned = await documents.ToListAsync();

            return returned;
        }

        //POST: 
        [HttpPost, Route("upload")]
        public async Task<IActionResult> UploadFile([FromForm]DocumentImageItem doc)
        {
            if (!MultipartRequestHelper.IsMultipartContentType(Request.ContentType))
            {
                return BadRequest($"Expected a multipart request, but got {Request.ContentType}");
            }
            try
            {
                using (var stream = doc.Image.OpenReadStream())
                {
                    var cloudBlock = await UploadToBlob(doc.Image.FileName, null, stream);
                    //// Retrieve the filename of the file you have uploaded
                    //var filename = provider.FileData.FirstOrDefault()?.LocalFileName;
                    if (string.IsNullOrEmpty(cloudBlock.StorageUri.ToString()))
                    {
                        return BadRequest("An error has occured while uploading your file. Please try again.");
                    }

                    DocumentItem docItem = new DocumentItem();
                    docItem.Title = doc.Title;
                    docItem.Tags = doc.Tags;
                    docItem.CourseName = doc.CourseName;
                    docItem.UserId = doc.UserId;
                    docItem.TypeDoc = GetFileExtention(doc.Image.FileName);

                    System.Drawing.Image image = System.Drawing.Image.FromStream(stream);
                    docItem.Height = image.Height.ToString();
                    docItem.Width = image.Width.ToString();
                    docItem.Url = cloudBlock.SnapshotQualifiedUri.AbsoluteUri;
                    docItem.Uploaded = DateTime.Now.ToString();

                    _context.DocumentItem.Add(docItem);
                    await _context.SaveChangesAsync();

                    return Ok($"File: {doc.Title} has successfully uploaded");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"An error has occured. Details: {ex.Message}");
            }


        }

 
        private async Task<CloudBlockBlob> UploadToBlob(string filename, byte[] imageBuffer = null, System.IO.Stream stream = null)
        {

            var accountName = _configuration["AzureBlob:name"];
            var accountKey = _configuration["AzureBlob:key"]; ;
            var storageAccount = new CloudStorageAccount(new StorageCredentials(accountName, accountKey), true);
            CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

            CloudBlobContainer imagesContainer = blobClient.GetContainerReference("images");

            string storageConnectionString = _configuration["AzureBlob:connectionString"];

            // Check whether the connection string can be parsed.
            if (CloudStorageAccount.TryParse(storageConnectionString, out storageAccount))
            {
                try
                {
                    // Generate a new filename for every new blob
                    var fileName = Guid.NewGuid().ToString();
                    fileName += GetFileExtention(filename);

                    // Get a reference to the blob address, then upload the file to the blob.
                    CloudBlockBlob cloudBlockBlob = imagesContainer.GetBlockBlobReference(fileName);

                    if (stream != null)
                    {
                        await cloudBlockBlob.UploadFromStreamAsync(stream);
                    }
                    else
                    {
                        return new CloudBlockBlob(new Uri(""));
                    }

                    return cloudBlockBlob;
                }
                catch (StorageException ex)
                {
                    return new CloudBlockBlob(new Uri(""));
                }
            }
            else
            {
                return new CloudBlockBlob(new Uri(""));
            }

        }

        private string GetFileExtention(string fileName)
        {
            if (!fileName.Contains("."))
                return ""; //no extension
            else
            {
                var extentionList = fileName.Split('.');
                return "." + extentionList.Last(); //assumes last item is the extension 
            }
        }
    }
}