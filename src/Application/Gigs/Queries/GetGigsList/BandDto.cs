using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Gigs.Queries.GetGigsList
{
    public class BandDto : IMapFrom<Band>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Genre { get; set; }
    }
}