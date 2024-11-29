using Microsoft.AspNetCore.Mvc;
using WebApplication1.Contract.Request;
using WebApplication1.Contract.Response;
using WebApplication1.Data;
using WebApplication1.Mappers;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("/v1/api/[controller]")]
    public class BasketController : Controller
    {
        private readonly StoreContext _storeContext;
        private readonly IBasketService _basketService;
        private readonly IBasketMapper _basketMapper;

        public BasketController(StoreContext storeContext, IBasketService basketService, IBasketMapper basketMapper)
        {
            _storeContext = storeContext;
            _basketService = basketService;
            _basketMapper = basketMapper;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<GetBasketResponse>> GetBasket()
        {
            var basket = await _basketService.RetrieveBasket(Request.Cookies["buyerId"]);
            if (basket == null) return NotFound();
            return _basketMapper.Map(basket);
        }

        [HttpPost]
        public async Task<ActionResult<GetBasketItemResponse>> AddItemToBasket(GetAddToBasketRequest request)
        {
            var basket = await _basketService.RetrieveBasket(Request.Cookies["buyerId"]);
            if (basket == null)
            {
                basket = _basketService.CreateBasket(out string buyerId);
                Response.Cookies.Append("buyerId", buyerId, _basketService.CookieOpt());
            }
            _basketService.AddItem(basket, request.productId, request.quantity);
            return CreatedAtRoute("GetBasket", _basketMapper.Map(basket));
        }
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(RemoveItemFromBasketRequest request)
        {
            var basket = await _basketService.RetrieveBasket(Request.Cookies["buyerId"]);
            if (basket == null) return NotFound();
            _basketService.DeleteItemFromBasket(basket, request.productId, request.quantity);
            return NoContent();
        }
    }
}
