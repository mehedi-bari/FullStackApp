using WebApplication1.Models;

namespace WebApplication1.Exceptions
{
    public class CustomException : Exception
    {
        public ErrorModel Errors { get; set; }
        public CustomException(ErrorModel errors)
            : base($"Client returned errors")
        {
            Errors = errors;
        }
    }
}
