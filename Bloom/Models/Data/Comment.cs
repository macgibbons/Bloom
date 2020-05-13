using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User  { get; set; }

        public int BrewId { get; set; }
        public Brew Brew { get; set; }
        public DateTime DatePosted { get; set; }
        public string Text { get; set; }
        public bool Edited { get; set; }

    }
}
