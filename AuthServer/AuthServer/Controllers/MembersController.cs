using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthServer.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.Controllers
{
    [Route("api/[controller]")]
    public class MembersController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;

        public MembersController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }
        // GET
        [Authorize(Roles = "Admin")]
        public async Task<List<User>> Index()
        {
            return _userManager.Users.ToList().Select(u =>
            {
                var roles = _userManager.GetRolesAsync(u).Result;
                return new User
                {
                    Id = u.Id,
                    Email = u.Email,
                    Name = u.UserName,
                    Role = roles.FirstOrDefault()
                };
            }).ToList();
        }
    }
}