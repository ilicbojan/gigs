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
    }
}
