using Application.Common.Mappings;
using Domain.Entities;
using System;

namespace Application.Gigs.Queries.GetGigById
{
    public class GigVm : IMapFrom<Gig>
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public BandDto Band { get; set; }
        public CafeDto Cafe { get; set; }
    }
}