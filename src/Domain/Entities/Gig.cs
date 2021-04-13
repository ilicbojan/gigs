using System;

namespace Domain.Entities
{
    public class Gig
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public int BandId { get; set; }
        public int CafeId { get; set; }

        public virtual Band Band { get; set; }
        public virtual Cafe Cafe { get; set; }
    }
}
