using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<AppUser> Users { get; set; }
        DbSet<Band> Bands { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
