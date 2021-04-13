using System.Collections.Generic;

namespace Application.Cafes.Queries.GetCafesList
{
    public class CafesListVm
    {
        public IList<CafeDto> Cafes { get; set; } = new List<CafeDto>();
    }
}