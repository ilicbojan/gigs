using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Bands.Commands.CreateBand
{
    public class CreateBandCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Members { get; set; }
        public string Genre { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    public class CreateBandCommandHandler : IRequestHandler<CreateBandCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateBandCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateBandCommand request, CancellationToken cancellationToken)
        {
            var band = new Band
            {
                Name = request.Name,
                Members = request.Members,
                Genre = request.Genre,
                Email = request.Email,
                Phone = request.Phone
            };

            _context.Bands.Add(band);

            await _context.SaveChangesAsync(cancellationToken);

            return band.Id;
        }
    }
}
