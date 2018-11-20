using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MSA.Models

{
    public class DocumentImageItem
    {
        public string UserId { get; set; } 
        public string CourseName { get; set;  }
        public string Title { get; set; }
        public string Tags { get; set; }
        public IFormFile Image { get; set; }
    }
}