using Application.Cafes.Commands.CreateCafe;
using Application.Cafes.Commands.DeleteCafe;
using Application.Cafes.Commands.UpdateCafe;
using Application.Cafes.Queries.GetCafeById;
using Application.Cafes.Queries.GetCafesList;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CafesController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<CafesListVm>> GetAll()
        {
            return await Mediator.Send(new GetCafesListQuery());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<CafeVm>> Get(int id)
        {
            return await Mediator.Send(new GetCafeByIdQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateCafeCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateCafeCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteCafeCommand { Id = id });
        }
    }
}
