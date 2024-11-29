using WebApplication1.Contract.Response;
using WebApplication1.Entities;

namespace WebApplication1.Mappers
{
    public class ProductsMapper : IProductsMapper
    {
        public GetProductResponse Map(Product product)
        {
            return new GetProductResponse()
            {
                Name = product.Name,
                Description = product.Description,
                Id = product.Id,
                Brand = product.Brand,
                Price = product.Price,
                PictureUrl = product.PictureUrl,
                Type = product.Type,
                QuantityInStock = product.QuantityInStock,
            };
        }
    }
}
