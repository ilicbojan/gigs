using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Bands.Queries.GetBandsList
{
    public class BandDto : IMapFrom<Band>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Members { get; set; }
        public string Genre { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
}