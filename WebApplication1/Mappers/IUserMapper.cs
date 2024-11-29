using WebApplication1.Contract.Request;
using WebApplication1.Models;

namespace WebApplication1.Mappers
{
    public interface IUserMapper
    {
        public User? Map(PostRegisterRequest user);
    }
}
