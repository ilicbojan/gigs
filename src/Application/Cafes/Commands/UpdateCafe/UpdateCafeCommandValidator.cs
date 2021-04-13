using FluentValidation;

namespace Application.Cafes.Commands.UpdateCafe
{
    public class UpdateCafeCommandValidator : AbstractValidator<UpdateCafeCommand>
    {
        public UpdateCafeCommandValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(50).WithMessage("Name cannot be longer than 50 characters")
                .NotEmpty().WithMessage("Name is required");

            RuleFor(x => x.City)
                .MaximumLength(30).WithMessage("City cannot be longer than 30 characters")
                .NotEmpty().WithMessage("City is required");

            RuleFor(x => x.Address)
                .MaximumLength(50).WithMessage("Address cannot be longer than 50 characters")
                .NotEmpty().WithMessage("Address is required");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email is not in the correct format");

            RuleFor(x => x.Phone)
                .MaximumLength(40).WithMessage("Phone number cannot be longer than 40 characters")
                .NotEmpty().WithMessage("Name is required");
        }
    }
}
