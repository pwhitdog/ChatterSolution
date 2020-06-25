using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthServer.Models
{
    public class BackendContext: IdentityDbContext
    {
        public BackendContext(DbContextOptions<BackendContext> options) : base(options)
        {
        }
        
    }

    public class DbInitializer
    {
        private readonly UserManager<IdentityUser> _userManager;

        public DbInitializer(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task Initialize(BackendContext context)
        {
            IdentityRole admin;
            // var tmp = context.Users.ToList();
            // var tmp2 = context.Roles.ToList();
            // var tmp3 = context.Roles.Any(r => r.Name == "Admin");

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                admin = new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                };
                await context.Roles.AddAsync(admin);
                await context.SaveChangesAsync();
            }
            else
            {
                admin = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");
            }
            
            IdentityRole member;
            
            if (!context.Roles.Any(r => r.Name == "Member"))
            {
                member = new IdentityRole
                {
                    Name = "Member",
                    NormalizedName = "MEMBER"
                };
                await context.Roles.AddAsync(member);
                await context.SaveChangesAsync();
            }
            else
            {
                member = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Member");
            }

            IdentityResult result;
            if (!context.Users.Any(u => u.Email == "admin@nope.com"))
            {
                var user = new IdentityUser
                {
                    Email = "admin@nope.com",
                    NormalizedEmail = "admin@nope.com",
                    UserName = "Admin",
                    EmailConfirmed = true,
                    
                };
                result = await _userManager.CreateAsync(user, "herpDerp1!");
                await context.SaveChangesAsync();
                result = await _userManager.AddToRoleAsync(user, admin.Name);
                
                context.SaveChangesAsync().Wait();
            }
            
            if (!context.Users.Any(u => u.Email == "molly@nope.com"))
            {
                var memberUser = new IdentityUser
                {
                    Email = "molly@nope.com",
                    NormalizedEmail = "molly@nope.com",
                    UserName = "Molly",
                    EmailConfirmed = true,
                    LockoutEnabled = false,
                    NormalizedUserName = "Molly O'Brian",
                };
                result = await _userManager.CreateAsync(memberUser, "herpDerp1!");
                await context.SaveChangesAsync();
                result = await _userManager.AddToRoleAsync(memberUser, member.Name);
                
                await context.SaveChangesAsync();
            }

        }
    }
}