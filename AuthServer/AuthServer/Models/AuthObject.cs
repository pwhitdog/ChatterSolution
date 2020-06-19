using System.Collections.Generic;

namespace AuthServer.Models
{
    public class AuthObject
    {
        public string? Token { get; set; }
        public List<string>? Roles { get; set; }
        public string? Error { get; set; }
        public string? UserName { get; set; }
    }
}