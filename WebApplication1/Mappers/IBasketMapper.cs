using WebApplication1.Contract.Response;
using WebApplication1.Entities;

namespace WebApplication1.Mappers
{
    public interface IBasketMapper
    {
        public GetBasketResponse Map(Basket basket);
    }
}
