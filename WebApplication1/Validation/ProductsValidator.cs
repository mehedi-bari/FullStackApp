using FluentValidation;
using WebApplication1.Contract.Request;

namespace WebApplication1.Validation
{
    public class ProductsValidator : AbstractValidator<GetProductRequest>
    {
        public ProductsValidator()
        {
            RuleFor(request => request.Id)
                .NotEmpty()
                .WithMessage("Id is required.")
                .WithErrorCode("400");
        }
    }
}
