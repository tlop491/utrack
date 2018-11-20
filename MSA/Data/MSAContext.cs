using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MSA.Models
{
    public class MSAContext : DbContext
    {
        public MSAContext (DbContextOptions<MSAContext> options)
            : base(options)
        {
        }

        public DbSet<MSA.Models.DocumentItem> DocumentItem { get; set; }
    }
}
