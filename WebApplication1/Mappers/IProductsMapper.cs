using WebApplication1.Contract.Response;
using WebApplication1.Entities;

namespace WebApplication1.Mappers
{
    public interface IProductsMapper
    {
        public GetProductResponse Map(Product product);
    }
}
