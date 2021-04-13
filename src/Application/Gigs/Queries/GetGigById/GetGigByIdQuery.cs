using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gigs.Queries.GetGigById
{
    public class GetGigByIdQuery : IRequest<GigVm>
    {
        public int Id { get; set; }
    }

    public class GetGigByIdQueryHandler : IRequestHandler<GetGigByIdQuery, GigVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetGigByIdQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GigVm> Handle(GetGigByIdQuery request, CancellationToken cancellationToken)
        {
            var vm = await _context.Gigs
                .Where(x => x.Id == request.Id)
                .ProjectTo<GigVm>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}
