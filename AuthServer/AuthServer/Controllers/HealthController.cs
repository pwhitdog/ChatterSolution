using System;
using Microsoft.AspNetCore.Mvc;

namespace AuthServer.Controllers
{
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        // GET
        public string Index()
        {
            return $"Living good and the time is {DateTime.Now.ToString()}";
        }
    }
}