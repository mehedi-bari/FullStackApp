using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Contract.Request
{
    public class PostRegisterRequest
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
