using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace SignalRDemo.Web.Controllers
{
    public class Person
    {
        private static int _id = 1;

        public Person()
        {
            Id = _id;
            _id++;
        }

        public int Id { get; private set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private static List<Person> _people = new List<Person>()
        {
            new Person
            {
                FirstName = "John",
                LastName = "Doe",
                Age = 45
            }
        };

        private IHubContext<TestHub> _hub;

        public PeopleController(IHubContext<TestHub> hub)
        {
            _hub = hub;
        }

        [HttpGet("getall")]
        public List<Person> GetAll()
        {
            return _people;
        }

        [HttpPost("add")]
        public void Add(Person person)
        {
            _people.Add(person);
            _hub.Clients.All.SendAsync("newPerson", _people);

        }
    }
}
