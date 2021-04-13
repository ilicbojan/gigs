using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Bands.Commands.DeleteBand
{
    public class DeleteBandCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteBandCommandHandler : IRequestHandler<DeleteBandCommand>
    {
        private readonly IAppDbContext _context;

        public DeleteBandCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteBandCommand request, CancellationToken cancellationToken)
        {
            var band = await _context.Bands.FindAsync(request.Id);

            if (band == null)
            {
                throw new NotFoundException(nameof(Band), request.Id);
            }

            _context.Bands.Remove(band);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
