using Application.Cafes.Commands.CreateCafe;
using Application.Cafes.Commands.UpdateCafe;
using Application.Cafes.Queries.GetCafeById;
using Application.Cafes.Queries.GetCafesList;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CafesController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<CafesListVm>> GetAll()
        {
            return await Mediator.Send(new GetCafesListQuery());
        }

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
    }
}
