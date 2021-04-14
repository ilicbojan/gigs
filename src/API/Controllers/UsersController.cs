using Application.Users.Commands.RegisterUser;
using Application.Users.Queries.GetCurrentUser;
using Application.Users.Queries.LoginUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UsersController : ApiController
    {
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<Application.Users.Commands.RegisterUser.UserVm>> Register(RegisterUserCommand command)
        {
            return await Mediator.Send(command);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<Application.Users.Queries.LoginUser.UserVm>> Login(LoginUserQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("current")]
        public async Task<ActionResult<Application.Users.Queries.GetCurrentUser.UserVm>> CurrentUser()
        {
            return await Mediator.Send(new GetCurrentUserQuery());
        }
    }
}
