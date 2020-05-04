using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Grinder
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}
