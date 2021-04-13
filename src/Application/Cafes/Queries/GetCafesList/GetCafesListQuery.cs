using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Cafes.Queries.GetCafesList
{
    public class GetCafesListQuery : IRequest<CafesListVm>
    {
    }

    public class GetCafesListQueryHandler : IRequestHandler<GetCafesListQuery, CafesListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetCafesListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CafesListVm> Handle(GetCafesListQuery request, CancellationToken cancellationToken)
        {
            var vm = new CafesListVm();

            vm.Cafes = await _context.Cafes
                .ProjectTo<CafeDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => x.Name)
                .ToListAsync(cancellationToken);

            return vm;
        }
    }
}
