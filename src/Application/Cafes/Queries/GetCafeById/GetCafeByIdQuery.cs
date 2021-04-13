using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Cafes.Queries.GetCafeById
{
    public class GetCafeByIdQuery : IRequest<CafeVm>
    {
        public int Id { get; set; }
    }

    public class GetCafeByIdQueryHandler : IRequestHandler<GetCafeByIdQuery, CafeVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetCafeByIdQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CafeVm> Handle(GetCafeByIdQuery request, CancellationToken cancellationToken)
        {
            var vm = await _context.Cafes
                .Where(x => x.Id == request.Id)
                .ProjectTo<CafeVm>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}
