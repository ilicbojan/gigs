using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Cafes.Commands.UpdateCafe
{
    public class UpdateCafeCommandValidator : AbstractValidator<UpdateCafeCommand>
    {
        private readonly IAppDbContext _context;

        public UpdateCafeCommandValidator(IAppDbContext context)
        {
            _context = context;

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(50).WithMessage("Name cannot be longer than 50 characters")
                .MustAsync(BeUniqueName).WithMessage("Selected name already exists");

            RuleFor(x => x.City)
                .NotEmpty().WithMessage("City is required")
                .MaximumLength(30).WithMessage("City cannot be longer than 30 characters");

            RuleFor(x => x.Address)
                .NotEmpty().WithMessage("Address is required")
                .MaximumLength(50).WithMessage("Address cannot be longer than 50 characters");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email is not in the correct format")
                .MustAsync(BeUniqueEmail).WithMessage("Selected email already exists");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone number is required")
                .MaximumLength(40).WithMessage("Phone number cannot be longer than 40 characters")
                .MustAsync(BeUniquePhone).WithMessage("Selected phone number already exists");
        }

        public async Task<bool> BeUniqueName(UpdateCafeCommand command, string name, CancellationToken cancellationToken)
        {
            return await _context.Cafes
                .Where(x => x.Id != command.Id)
                .AllAsync(x => x.Name != name);
        }

        public async Task<bool> BeUniqueEmail(UpdateCafeCommand command, string email, CancellationToken cancellationToken)
        {
            return await _context.Cafes
                .Where(x => x.Id != command.Id)
                .AllAsync(x => x.Email != email);
        }

        public async Task<bool> BeUniquePhone(UpdateCafeCommand command, string phone, CancellationToken cancellationToken)
        {
            return await _context.Cafes
                .Where(x => x.Id != command.Id)
                .AllAsync(x => x.Phone != phone);
        }
    }
}
