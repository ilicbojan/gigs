using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gigs.Queries.GetGigsList
{
    public class GetGigsListQuery : IRequest<GigsListVm>
    {
    }

    public class GetGigsListQueryHandler : IRequestHandler<GetGigsListQuery, GigsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetGigsListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GigsListVm> Handle(GetGigsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new GigsListVm();

            vm.Gigs = await _context.Gigs
                .Where(x => x.Date >= DateTime.Now)
                .ProjectTo<GigDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Date).ThenBy(x => x.Time)
                .ToListAsync(cancellationToken);

            return vm;
        }
    }
}
