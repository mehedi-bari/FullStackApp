using FluentValidation;
using WebApplication1.Contract.Request;

namespace WebApplication1.Validation
{
    public class LoginValidator : AbstractValidator<PostLoginUserRequest>
    {
        public LoginValidator()
        {
            RuleFor(request => request.Email)
                .NotNull()
                .WithMessage("Email is required.")
                .WithErrorCode("400");
        }
    }
}