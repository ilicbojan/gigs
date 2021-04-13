using Application.Gigs.Commands.CreateGig;
using Application.Gigs.Commands.DeleteGig;
using Application.Gigs.Commands.UpdateGig;
using Application.Gigs.Queries.GetGigById;
using Application.Gigs.Queries.GetGigsList;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class GigsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<GigsListVm>> GetAll()
        {
            return await Mediator.Send(new GetGigsListQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GigVm>> Get(int id)
        {
            return await Mediator.Send(new GetGigByIdQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateGigCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateGigCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteGigCommand { Id = id });
        }
    }
}
