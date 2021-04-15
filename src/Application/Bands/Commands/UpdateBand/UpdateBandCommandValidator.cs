using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Bands.Commands.UpdateBand
{
    public class UpdateBandCommandValidator : AbstractValidator<UpdateBandCommand>
    {
        private readonly IAppDbContext _context;

        public UpdateBandCommandValidator(IAppDbContext context)
        {
            _context = context;

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(50).WithMessage("Name cannot be longer than 50 characters")
                .MustAsync(BeUniqueName).WithMessage("Selected name already exists");

            RuleFor(x => x.Members)
                .MaximumLength(100).WithMessage("Members cannot be longer than 100 characters")
                .NotEmpty().WithMessage("Members are required");

            RuleFor(x => x.Genre)
                .MaximumLength(30).WithMessage("Genre cannot be longer than 30 characters")
                .NotEmpty().WithMessage("Genre is required");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email is not in the correct format")
                .MustAsync(BeUniqueEmail).WithMessage("Selected email already exists");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone number is required")
                .MaximumLength(40).WithMessage("Phone number cannot be longer than 40 characters")
                .MustAsync(BeUniquePhone).WithMessage("Selected phone number already exists");
        }

        public async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            return await _context.Bands.AllAsync(x => x.Name != name);
        }

        public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
        {
            return await _context.Bands.AllAsync(x => x.Email != email);
        }

        public async Task<bool> BeUniquePhone(string phone, CancellationToken cancellationToken)
        {
            return await _context.Bands.AllAsync(x => x.Phone != phone);
        }
    }
}
