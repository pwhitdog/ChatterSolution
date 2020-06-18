using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatterSite.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ChatterSite.Hubs
{
    public class WebRtcHub : Hub
    {
        private static readonly List<User> Users = new List<User>();

        [Authorize(Roles = "Member")]
        public async Task CreateCall(string username, string groupName)
        {
            var user = new User
            {
                Username = username,
                ConnectionId = Context.ConnectionId,
                GroupName = groupName,
                IsOwner = true
            };
            
            Users.Add(user);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        [Authorize(Roles = "Member")]
        public async Task EndCall()
        {
            var user = Users.FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            if (user != null && user.IsOwner)
            {
                await Clients.Group(user.GroupName).SendAsync("EndCall", "This call has been ended");
                Users.RemoveAll(u => u.GroupName == user.GroupName);
            }
        }
        
        public async Task Join(string username, string groupName)
        {
            var targetUser = Users.FirstOrDefault(u => u.GroupName == groupName);

            // Make sure the room is still open
            if (targetUser == null)
            {
                // If not, let the caller know
                await Clients.Caller.SendAsync("RoomEnded", "This room has ended.");
                return;
            }
            
            // Add the new user
            var user = new User
            {
                Username = username,
                ConnectionId = Context.ConnectionId,
                GroupName = groupName
            };
            
            Users.Add(user);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            
            // Send down the new list to all clients
            await SendUserListUpdate(groupName);
        }
        
        public async Task LeaveCall(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            var user = Users.Where(u => u.GroupName == groupName).FirstOrDefault(u => u.ConnectionId == Context.ConnectionId);
            Users.Remove(user);
            await SendUserListUpdate(groupName);
        }

        private async Task SendUserListUpdate(string groupName)
        {
            await Clients.Group(groupName).SendAsync("Update", JsonConvert.SerializeObject(Users.Where(u => u.GroupName == groupName)));
        }
    }
}