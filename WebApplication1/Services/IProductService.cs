using WebApplication1.Contract.Response;

namespace WebApplication1.Services
{
    public interface IProductService
    {
        Task<GetProductResponse> GetProductAsync(int id);
    }
}
