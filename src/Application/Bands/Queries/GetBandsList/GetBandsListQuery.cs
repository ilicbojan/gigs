using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Bands.Queries.GetBandsList
{
    public class GetBandsListQuery : IRequest<BandsListVm>
    {
    }

    public class GetBandsListQueryHandler : IRequestHandler<GetBandsListQuery, BandsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetBandsListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BandsListVm> Handle(GetBandsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new BandsListVm();

            vm.Bands = await _context.Bands
                .ProjectTo<BandDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Name)
                .ToListAsync(cancellationToken);

            return vm;
        }
    }
}
