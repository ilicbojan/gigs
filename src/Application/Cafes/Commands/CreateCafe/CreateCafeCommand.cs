using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Cafes.Commands.CreateCafe
{
    public class CreateCafeCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    public class CreateCafeCommandHandler : IRequestHandler<CreateCafeCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateCafeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateCafeCommand request, CancellationToken cancellationToken)
        {
            var cafe = new Cafe
            {
                Name = request.Name,
                City = request.City,
                Address = request.Address,
                Email = request.Email,
                Phone = request.Phone
            };

            _context.Cafes.Add(cafe);

            await _context.SaveChangesAsync(cancellationToken);

            return cafe.Id;
        }
    }
}
