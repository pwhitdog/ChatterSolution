using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthServer.Models;
using AuthServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
            
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, true, false);

            if (!result.Succeeded)
            {
                return BadRequest(JsonConvert.SerializeObject(new AuthObject { Error = "Incorrect username or password entered."}));
            }
            
            var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);
            var userRoles = await _userManager.GetRolesAsync(appUser);
            var jwt = await _jwtTokenService.GenerateJwtToken(model.Email, appUser, userRoles);
                
            var returnObj = new AuthObject
            {
                Token = jwt.ToString(),
                Roles = userRoles.ToList(),
                UserName = appUser.UserName
            };
            
            var json = JsonConvert.SerializeObject(returnObj);
            return Ok(json);
        }
       
        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ObjectResult> Create([FromBody] RegisterDto model)
        {
            var user = new IdentityUser
            {
                UserName = model.Email, 
                Email = model.Email
            };
            
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded) return BadRequest("Incorrect username or password entered."); 
            return Ok(user);
        }
    }
}