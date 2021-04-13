using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class GigConfiguration : IEntityTypeConfiguration<Gig>
    {
        public void Configure(EntityTypeBuilder<Gig> builder)
        {
            builder.HasOne(g => g.Band)
                .WithMany(b => b.Gigs)
                .HasForeignKey(g => g.BandId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(g => g.Cafe)
                .WithMany(c => c.Gigs)
                .HasForeignKey(g => g.CafeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Property(x => x.Id)
               .IsRequired();

            builder.Property(x => x.Date)
                .IsRequired();

            builder.Property(x => x.Time)
                .IsRequired();

            builder.Property(x => x.BandId)
                .IsRequired();

            builder.Property(x => x.CafeId)
                .IsRequired();
        }
    }
}
