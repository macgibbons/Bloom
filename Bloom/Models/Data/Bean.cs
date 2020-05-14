using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Bean
    {
        public int Id { get; set; }
        public string BeanName { get; set; }
        public string RoastLevel { get; set; }
        public string MASL { get; set; }
        public DateTime? RoastDate { get; set; }
        public int Quantity { get; set; }
        public int Rating { get; set; }
        public string TastingNotes { get; set; }
        public string Variety { get; set; }
        public string Process { get; set; }
        public string Notes { get; set; }
        public string Origin { get; set; }
        public string Roaster { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public int RegionId { get; set; }
        public Region Region { get; set; }
        

    }
}
