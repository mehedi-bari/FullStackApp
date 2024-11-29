using Microsoft.EntityFrameworkCore;
using WebApplication1.Contract.Response;
using WebApplication1.Data;
using WebApplication1.Entities;
using WebApplication1.Exceptions;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public class BasketService : IBasketService
    {
        private readonly StoreContext _storeContext;

        public BasketService(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public CookieOptions CookieOpt()
        {
            return new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
        }
        public Basket CreateBasket(out string buyerId)
        {
            buyerId = Guid.NewGuid().ToString();
            var basket = new Basket { BuyerId = buyerId };
            _storeContext.Baskets.Add(basket);
            return basket;
        }

        public async void AddItem(Basket basket, int productId, int quantity)
        {
            var product = await _storeContext.Products.FindAsync(productId);
            if (product == null)
            {
                var errors = new ErrorModel()
                {
                    Code = 400,
                    Message = "Product not found"
                };
                throw new CustomException(errors);

            }
            basket.AddItem(product, quantity);
            var result = await _storeContext.SaveChangesAsync() <= 0;
            if (result) ErrorSavingToServer();
            return;
        }

        public async Task<Basket?> RetrieveBasket(string? buyerId)
        {
            var response = await _storeContext.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
            return response;
        }

        public async void DeleteItemFromBasket(Basket basket, int productId, int quantity)
        {
            basket.RemoveItem(productId, quantity);
            var result = await _storeContext.SaveChangesAsync() <= 0;
            if (result) ErrorSavingToServer();
        }

        public void ErrorSavingToServer()
        {
            var errors = new ErrorModel()
            {
                Code = 401,
                Message = "Error with saving changes to server"
            };
            throw new CustomException(errors);
        }
    }
}
