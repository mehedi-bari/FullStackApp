namespace WebApplication1.Contract.Response
{
    public class GetBasketItemResponse
    {
        public int productId { get; set; }
        public string? Name { get; set; }
        public long Price { get; set; }
        public string? PictureUrl { get; set; }
        public string? Brand { get; set; }
        public string? Title { get; set; }
        public int Quantity { get; set; }
    }
}
