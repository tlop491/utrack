using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MSA.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MSAContext(
                serviceProvider.GetRequiredService<DbContextOptions<MSAContext>>()))
            {
                // Look for any movies.
                if (context.DocumentItem.Count() > 0)
                {
                    return;   // DB has been seeded
                }

                context.DocumentItem.AddRange(
                    new DocumentItem
                   {
                        Id = 1,
                       Title= "Is Mayonnaise an Instrument?",
                       Url= "https://example.com/url-to-meme-img.jpg",
                       Tags= "Spongebob",
                       Uploaded= "11/10/2018 10:09:52 PM",
                       UserId = "Tim",
                       CourseName= "Compsys 303",
                       TypeDoc= "Notes",
                       Width= "680",
                       Height= "680",
                   }

                );
                context.SaveChanges();
            }
        }
    }
}
