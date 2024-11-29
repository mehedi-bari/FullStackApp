using WebApplication1.Contract.Request;
using WebApplication1.Models;

namespace WebApplication1.Mappers
{
    public class UserMapper : IUserMapper
    {
        public User? Map(PostRegisterRequest user)
        {
            if (user.Email == null) return null;
            string userName = user.Email;
            if (user.Email.Contains('@')) userName = user.Email.Split("@", 2)[0];
            return new User
            {
                UserName = userName,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }
    }
}
