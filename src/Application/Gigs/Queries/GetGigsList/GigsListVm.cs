using System.Collections.Generic;

namespace Application.Gigs.Queries.GetGigsList
{
    public class GigsListVm
    {
        public IList<GigDto> Gigs { get; set; } = new List<GigDto>();
    }
}