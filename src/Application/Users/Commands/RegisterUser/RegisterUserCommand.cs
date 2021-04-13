using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands.RegisterUser
{
    public class RegisterUserCommand : IRequest<UserVm>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, UserVm>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;

        public RegisterUserCommandHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<UserVm> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = new AppUser
            {
                Email = request.Email,
                UserName = request.Email
            };

            var result = await _userManager.CreateAsync(user, request.Password);


            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, RoleEnum.Admin);

                var loginResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (loginResult.Succeeded)
                {
                    var vm = new UserVm
                    {
                        Token = await _jwtGenerator.CreateToken(user),
                        Id = user.Id,
                        Email = user.Email
                    };

                    return vm;
                }
            }

            throw new Exception("Problem registering user");
        }
    }
}
