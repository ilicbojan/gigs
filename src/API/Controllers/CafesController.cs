using Application.Cafes.Queries.GetCafeById;
using Application.Cafes.Queries.GetCafesList;
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
    }
}
