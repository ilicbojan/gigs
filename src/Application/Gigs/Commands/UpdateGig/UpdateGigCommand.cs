using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gigs.Commands.UpdateGig
{
    public class UpdateGigCommand : IRequest
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public int BandId { get; set; }
        public int CafeId { get; set; }
    }

    public class UpdateGigCommandHandler : IRequestHandler<UpdateGigCommand>
    {
        private readonly IAppDbContext _context;

        public UpdateGigCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateGigCommand request, CancellationToken cancellationToken)
        {
            var gig = await _context.Gigs.FindAsync(request.Id);

            if (gig == null)
            {
                throw new NotFoundException(nameof(Gig), request.Id);
            }

            gig.Date = DateTime.Parse(request.Date);
            gig.Time = TimeSpan.Parse(request.Time);
            gig.BandId = request.BandId;
            gig.CafeId = request.CafeId;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
