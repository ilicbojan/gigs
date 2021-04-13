using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public static class AppDbContextSeed
    {
        public static async Task SeedAsync(AppDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                var roles = new List<IdentityRole>
                {
                    new IdentityRole { Name = RoleEnum.Admin}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser { Email = "admin@test.com", UserName = "admin" },
                    new AppUser { Email= "user@test.com", UserName = "user" }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "test12");
                }
            }

            if (!context.UserRoles.Any())
            {
                var users = userManager.Users.ToList();

                foreach (var user in users)
                {
                    await userManager.AddToRoleAsync(user, RoleEnum.Admin);
                }
            }

            if (!context.Bands.Any())
            {
                var bands = new List<Band>
                {
                    new Band { Name = "Pink Floyd", Members = "David Gilmour, Roger Waters, Syd Berrett", Genre = "Progressive Rock", Email = "pink.floyd@test.com", Phone = "+381652315847" },
                    new Band { Name = "Tool", Members = "Adam Jones, Danny Carey, James Keenan", Genre = "Progressive Metal", Email = "tool@test.com", Phone = "+381648521463" },
                    new Band { Name = "Metallica", Members = "James Hetfield, Lars Urlich, Kirk Hammet", Genre = "Heavy Metal", Email = "metallica@test.com", Phone = "+381652365129" }
                };

                context.Bands.AddRange(bands);

                await context.SaveChangesAsync();
            }

            if (!context.Cafes.Any())
            {
                var cafes = new List<Cafe>
                {
                    new Cafe { Name = "Tramvaj Pub", City = "Belgrade", Address = "Ruzveltova 2", Email = "tramvaj@test.com", Phone = "+381616548521" },
                    new Cafe { Name = "Cigla & Krigla", City = "Belgrade", Address = "Dalmatinska 44", Email = "cigla@test.com", Phone = "+381659645236" },
                    new Cafe { Name = "Irish Pub", City = "Novi Sad", Address = "Zmaj Jovina 28", Email = "irish@test.com", Phone = "+381648754623" }
                };

                context.Cafes.AddRange(cafes);

                await context.SaveChangesAsync();
            }

            if (!context.Gigs.Any())
            {
                var gigs = new List<Gig>();

                var bands = context.Bands
                    .OrderBy(x => x.Id)
                    .Take(3)
                    .ToList();

                var cafes = context.Cafes
                    .OrderBy(x => x.Id)
                    .Take(3)
                    .ToList();

                var date = DateTime.Parse("10/06/2021");
                var time = TimeSpan.Parse("19:00:00");

                foreach (var band in bands)
                {
                    foreach (var cafe in cafes)
                    {
                        gigs.Add(new Gig { Date = date, Time = time, BandId = band.Id, CafeId = cafe.Id });


                        date = date.AddDays(1);
                        time = time + TimeSpan.FromMinutes(30);
                    }
                }

                context.Gigs.AddRange(gigs);

                await context.SaveChangesAsync();
            }
        }
    }
}
