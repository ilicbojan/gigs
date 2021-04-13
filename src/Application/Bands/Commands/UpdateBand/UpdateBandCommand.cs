using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Bands.Commands.UpdateBand
{
    public class UpdateBandCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Members { get; set; }
        public string Genre { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    public class UpdateBandCommandHandler : IRequestHandler<UpdateBandCommand>
    {
        private readonly IAppDbContext _context;

        public UpdateBandCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateBandCommand request, CancellationToken cancellationToken)
        {
            var band = await _context.Bands.FindAsync(request.Id);

            if (band == null)
            {
                throw new NotFoundException(nameof(Band), request.Id);
            }

            band.Name = request.Name;
            band.Members = request.Members;
            band.Genre = request.Genre;
            band.Email = request.Email;
            band.Phone = request.Phone;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
