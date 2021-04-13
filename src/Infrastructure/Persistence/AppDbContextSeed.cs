using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
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
        }
    }
}
