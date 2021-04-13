using Application.Users.Commands.RegisterUser;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UsersController : ApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserVm>> Register(RegisterUserCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
