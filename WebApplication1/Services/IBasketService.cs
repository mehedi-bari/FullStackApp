using WebApplication1.Contract.Response;
using WebApplication1.Entities;
using WebApplication1.Models;

namespace WebApplication1.Services
{
    public interface IBasketService
    {

        CookieOptions CookieOpt();
        Basket CreateBasket(out string buyerId);
        void AddItem(Basket basket, int productId, int quantity);
        Task<Basket?> RetrieveBasket(string? buyerId);
        void DeleteItemFromBasket(Basket basket, int productId, int quantity);
    }
}
