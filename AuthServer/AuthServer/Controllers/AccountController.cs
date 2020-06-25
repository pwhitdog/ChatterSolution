using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthServer.Models;
using AuthServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace AuthServer.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly JwtTokenService _jwtTokenService;
        private readonly UserManager<IdentityUser> _userManager;

        public AccountController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration
            )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenService = new JwtTokenService(configuration);
        }
        
        [HttpPost]
        public async Task<ObjectResult> Login([FromBody] LoginDto model)
        {
            var user = await _signInManager.UserManager.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            var result = await _signInManager.PasswordSignInAsync(user, model.Password, true, false);
            
            if (!result.Succeeded)
            {
                return BadRequest(JsonConvert.SerializeObject(new AuthObject { Error = "Incorrect username or password entered."}));
            }
            
            var userRoles = await _userManager.GetRolesAsync(user);
            var jwt = await _jwtTokenService.GenerateJwtToken(model.Email, user, userRoles);
                
            var returnObj = new AuthObject
            {
                Token = jwt.ToString(),
                Roles = userRoles.ToList(),
                UserName = user.UserName
            };
            
            var json = JsonConvert.SerializeObject(returnObj);
            return Ok(json);
        }
       
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ObjectResult> Create([FromBody] RegisterDto model)
        {
            var user = new IdentityUser
            {
                UserName = model.Username, 
                Email = model.Email,
            };
            
            var result = await _userManager.CreateAsync(user, model.Password);
            result = await _userManager.AddToRolesAsync(user, new List<string> {model.Role});

            if (!result.Succeeded) return BadRequest("Incorrect username or password entered."); 
            return Ok(user);
        }
    }
}