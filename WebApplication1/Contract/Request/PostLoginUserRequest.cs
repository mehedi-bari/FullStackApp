using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Contract.Request
{
    public class PostLoginUserRequest
    {
        //[Required]
        public string? Email { get; set; }
        //[Required]
        public string? Password { get; set; }
    }
}
