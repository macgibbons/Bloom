using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class UserRating
    {
        public int Id { get; set; }
        public int BrewId { get; set; }
        public string UserId { get; set; }
        public Brew Brew { get; set; }
        public ApplicationUser User { get; set; }
        public int Rating { get; set; }
    }
}
