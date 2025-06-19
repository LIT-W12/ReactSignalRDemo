using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Microsoft.AspNetCore.SignalR;

namespace SignalRDemo.Web
{

    public class TestHub : Hub
    {
        private static List<ChatMessage> _chatMessages = new();

        //private string _connectionString;
        //public TestHub(IConfiguration configuration)
        //{
        //    _ connectionString = configuration.GetConnectionString("ConStr");
        //}

        public void Foobar()
        {
            Clients.All.SendAsync("newMessage", new { guid = Guid.NewGuid() });
        }

        public void NewChatMessage(ChatMessage message)
        {
            _chatMessages.Add(message);
            Clients.All.SendAsync("newChatReceived", message);
        }

        public void NewUser()
        {
            //Context.User.Identity.Name -- this will get the currently logged in users email
            Clients.Caller.SendAsync("allMessages", _chatMessages);
        }
    }

    public class ChatMessage
    {
        public string Message { get; set; }
    }
}
