namespace WebApplication1.Contract.Response
{
    public class GetBasketResponse
    {
        public int Id { get; set; }
        public string? BuyerId { get; set; }
        public List<GetBasketItemResponse> Items { get; set; }
    }
}
