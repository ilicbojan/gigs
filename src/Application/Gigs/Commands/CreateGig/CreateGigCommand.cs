using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gigs.Commands.CreateGig
{
    public class CreateGigCommand : IRequest<int>
    {
        public string Date { get; set; }
        public string Time { get; set; }
        public int BandId { get; set; }
        public int CafeId { get; set; }
    }

    public class CreateGigCommandHandler : IRequestHandler<CreateGigCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateGigCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateGigCommand request, CancellationToken cancellationToken)
        {
            var gig = new Gig
            {
                Date = DateTime.Parse(request.Date),
                Time = TimeSpan.Parse(request.Time),
                BandId = request.BandId,
                CafeId = request.CafeId
            };

            _context.Gigs.Add(gig);

            await _context.SaveChangesAsync(cancellationToken);

            return gig.Id;
        }
    }
}
