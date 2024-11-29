using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using WebApplication1.Contract.Request;
using WebApplication1.Contract.Response;
using WebApplication1.Data;
using WebApplication1.Entities;
using WebApplication1.Exceptions;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/v1/api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly StoreContext _storeContext;
        private readonly IProductService _productService;
        private readonly ILogger<ProductsController> _logger;


        public ProductsController(StoreContext context, IProductService productService, ILogger<ProductsController> logger)
        {
            _storeContext = context;
            _productService = productService;
            _logger = logger;
        }

        /// <summary>
        /// Get a list of all products.
        /// </summary>
        /// <returns>List of products.</returns>
        [HttpGet]
        [SwaggerResponse(200, "Returns the list of products", typeof(List<Product>))]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            try
            {
                var products = await _storeContext.Products.ToListAsync();
                return Ok(products);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// Get a product by its ID.
        /// </summary>
        /// <param name="Id">Product ID</param>
        /// <returns>A single product.</returns>
        [HttpGet("{Id}")]
        [SwaggerResponse(200, "Returns the product with the specified ID", typeof(Product))]
        [SwaggerResponse(404, "Product not found")]
        [SwaggerResponse(500, "Internal server error")]
        public async Task<ActionResult<GetProductResponse>> GetProduct([FromRoute] GetProductRequest request)
        {
            try
            {
                var mappedProduct = await _productService.GetProductAsync(request.Id);
                return Ok(mappedProduct);
            }
            catch (CustomException ex)
            {
                _logger.LogError(ex, ex.Message);
                return StatusCode(ex.Errors.Code, ex.Errors.Message);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
