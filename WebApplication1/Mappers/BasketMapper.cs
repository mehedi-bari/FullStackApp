using WebApplication1.Contract.Response;
using WebApplication1.Entities;

namespace WebApplication1.Mappers
{
    public class BasketMapper : IBasketMapper
    {
        public GetBasketResponse Map(Basket basket)
        {
            return new GetBasketResponse
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new GetBasketItemResponse
                {
                    productId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };

        }
    }
}
