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
        }
    }
}
