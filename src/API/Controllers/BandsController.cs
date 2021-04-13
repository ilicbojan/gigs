﻿using Application.Bands.Queries.GetBandById;
using Application.Bands.Queries.GetBandsList;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BandsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<BandsListVm>> GetAll()
        {
            return await Mediator.Send(new GetBandsListQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BandVm>> Get(int id)
        {
            return await Mediator.Send(new GetBandByIdQuery { Id = id });
        }
    }
}