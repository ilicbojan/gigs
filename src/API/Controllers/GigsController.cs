using Application.Gigs.Queries.GetGigById;
using Application.Gigs.Queries.GetGigsList;
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
    }
}
