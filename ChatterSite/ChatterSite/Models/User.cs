namespace ChatterSite.Models
{
    public class User
    {
        public string Username { get; set; }
        public string ConnectionId { get; set; }
        public string GroupName { get; set; }
        public bool IsOwner { get; set; }
    }
}