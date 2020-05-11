using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Brew
    {
        public int Id { get; set; }
        public double CoffeeDose { get; set; }
        public double WaterDose { get; set; }
        public int WaterTemp { get; set; }
        public int Bloom { get; set; }
        public int BrewTime { get; set; }
        public int Rating { get; set; }
        public string Notes { get; set; }
        public DateTime BrewDate { get; set; }
        public int GrindSetting { get; set; }
        public int GrinderId { get; set; }
        public Grinder Grinder { get; set; }
        public int BrewMethodId { get; set; }
        public BrewMethod BrewMethod { get; set; }
        public int BeanId { get; set; }
        public Bean Bean { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public bool Shared { get; set; }

    }
}
