using FluentValidation;

namespace Application.Bands.Commands.UpdateBand
{
    public class UpdateBandCommandValidator : AbstractValidator<UpdateBandCommand>
    {
        public UpdateBandCommandValidator()
        {
            RuleFor(x => x.Name)
                .MaximumLength(50).WithMessage("Name cannot be longer than 50 characters")
                .NotEmpty().WithMessage("Name is required");

            RuleFor(x => x.Members)
                .MaximumLength(100).WithMessage("Members cannot be longer than 100 characters")
                .NotEmpty().WithMessage("Members are required");

            RuleFor(x => x.Genre)
                .MaximumLength(30).WithMessage("Genre cannot be longer than 30 characters")
                .NotEmpty().WithMessage("Genre is required");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email is not in the correct format");

            RuleFor(x => x.Phone)
                .MaximumLength(40).WithMessage("Phone number cannot be longer than 40 characters")
                .NotEmpty().WithMessage("Name is required");
        }
    }
}
