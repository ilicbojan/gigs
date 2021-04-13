using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Queries.GetCurrentUser
{
    public class GetCurrentUserQuery : IRequest<UserVm>
    {
    }

    public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, UserVm>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly ICurrentUserService _currentUserService;

        public GetCurrentUserQueryHandler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
            _jwtGenerator = jwtGenerator;
            _userManager = userManager;
        }

        public async Task<UserVm> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);

            return new UserVm
            {
                Id = user.Id,
                Token = await _jwtGenerator.CreateToken(user),
                Email = user.Email
            };
        }
    }
}
