using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Gigs.Queries.GetGigsList
{
    public class CafeDto : IMapFrom<Cafe>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
    }
}