using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class BrewMethod
    {
        public int Id { get; set; }
        public string Method { get; set; }
        public Boolean PaperFilter { get; set; }
        public string BrewType { get; set; }
        public string ImagePath { get; set; }

    }
}
