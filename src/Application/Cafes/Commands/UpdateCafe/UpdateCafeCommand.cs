using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Cafes.Commands.UpdateCafe
{
    public class UpdateCafeCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    public class UpdateCafeCommandHandler : IRequestHandler<UpdateCafeCommand>
    {
        private readonly IAppDbContext _context;

        public UpdateCafeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateCafeCommand request, CancellationToken cancellationToken)
        {
            var cafe = await _context.Cafes.FindAsync(request.Id);

            if (cafe == null)
            {
                throw new NotFoundException(nameof(Cafe), request.Id);
            }

            cafe.Name = request.Name;
            cafe.City = request.City;
            cafe.Address = request.Address;
            cafe.Email = request.Email;
            cafe.Phone = request.Phone;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
