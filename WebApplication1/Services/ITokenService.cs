using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface ITokenService
    {
        Task<string> GenerateToken(User user);
    }
}
