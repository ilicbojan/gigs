using Application.Bands.Commands.CreateBand;
using Application.Bands.Commands.DeleteBand;
using Application.Bands.Commands.UpdateBand;
using Application.Bands.Queries.GetBandById;
using Application.Bands.Queries.GetBandsList;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BandsController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<BandsListVm>> GetAll()
        {
            return await Mediator.Send(new GetBandsListQuery());
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<BandVm>> Get(int id)
        {
            return await Mediator.Send(new GetBandByIdQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateBandCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateBandCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteBandCommand { Id = id });
        }
    }
}
