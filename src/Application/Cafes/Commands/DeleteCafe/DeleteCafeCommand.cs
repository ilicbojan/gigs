using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Cafes.Commands.DeleteCafe
{
    public class DeleteCafeCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteCafeCommandHandler : IRequestHandler<DeleteCafeCommand>
    {
        private readonly IAppDbContext _context;

        public DeleteCafeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteCafeCommand request, CancellationToken cancellationToken)
        {
            var cafe = await _context.Cafes.FindAsync(request.Id);

            if (cafe == null)
            {
                throw new NotFoundException(nameof(Cafe), request.Id);
            }

            _context.Cafes.Remove(cafe);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
