using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gigs.Commands.DeleteGig
{
    public class DeleteGigCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteGigCommandHandler : IRequestHandler<DeleteGigCommand>
    {
        private readonly IAppDbContext _context;

        public DeleteGigCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteGigCommand request, CancellationToken cancellationToken)
        {
            var gig = await _context.Gigs.FindAsync(request.Id);

            if (gig == null)
            {
                throw new NotFoundException(nameof(Gig), request.Id);
            }

            _context.Gigs.Remove(gig);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
