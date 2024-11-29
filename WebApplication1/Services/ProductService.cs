using WebApplication1.Contract.Response;
using WebApplication1.Data;
using WebApplication1.Exceptions;
using WebApplication1.Mappers;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class ProductService : IProductService
    {
        private readonly StoreContext _storeContext;
        private readonly IProductsMapper _productsMapper;

        public ProductService(StoreContext context, IProductsMapper productsMapper)
        {
            _storeContext = context;
            _productsMapper = productsMapper;
        }

        public async Task<GetProductResponse> GetProductAsync(int id)
        {
            var product = await _storeContext.Products.FindAsync(id);
            if (product == null)
            {
                var errors = new ErrorModel()
                {
                    Code = 400,
                    Message = "Product not found"
                };
                throw new CustomException(errors);
            }
            return _productsMapper.Map(product);
        }

    }
}
