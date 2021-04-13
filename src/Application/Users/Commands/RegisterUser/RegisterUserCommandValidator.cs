using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.RegisterUser
{
    public class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
    {
        private readonly IAppDbContext _context;

        public RegisterUserCommandValidator(IAppDbContext context)
        {
            _context = context;

            RuleFor(v => v.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email is not in the correct format")
                .MustAsync(BeUniqueEmail).WithMessage("Email already exists");

            RuleFor(v => v.Password)
                .NotEmpty().WithMessage("Password is required");
        }

        public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
        {
            return await _context.Users.AllAsync(c => c.Email != email);
        }
    }
}
