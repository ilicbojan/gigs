using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Bands.Queries.GetBandById
{
    public class GetBandByIdQuery : IRequest<BandVm>
    {
        public int Id { get; set; }
    }

    public class GetBandByIdQueryHandler : IRequestHandler<GetBandByIdQuery, BandVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetBandByIdQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BandVm> Handle(GetBandByIdQuery request, CancellationToken cancellationToken)
        {
            var vm = await _context.Bands
                .Where(x => x.Id == request.Id)
                .ProjectTo<BandVm>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}
