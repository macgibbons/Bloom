using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Capstone.Models.Data
{
    public class Follow
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string FolllowId { get; set; }
        public ApplicationUser FollowUser { get; set; }
    }
}

