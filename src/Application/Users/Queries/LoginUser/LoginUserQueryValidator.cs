using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.LoginUser
{
    public class LoginUserQueryValidator : AbstractValidator<LoginUserQuery>
    {
        private readonly UserManager<AppUser> _userManager;
        public LoginUserQueryValidator(UserManager<AppUser> userManager)
        {
            _userManager = userManager;

            RuleFor(v => v.Email)
              .NotEmpty().WithMessage("Email is required")
              .EmailAddress().WithMessage("Email is not in the correct format")
              .MustAsync(EmailExists).WithMessage("Email does not exist, you need to register");

            RuleFor(v => v.Password)
                .NotEmpty().WithMessage("Password is required");
        }

        public async Task<bool> EmailExists(string email, CancellationToken cancellationToken)
        {
            return await _userManager.Users.AnyAsync(u => u.Email == email);
        }
    }
}