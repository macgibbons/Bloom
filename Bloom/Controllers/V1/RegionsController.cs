using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Capstone.Models.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Capstone.Controllers.V1
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public RegionsController(IConfiguration config)
        {
            _config = config;
        }
        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        // ----------Get all----------
        [HttpGet]
        public async Task<IActionResult> Get()

        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM Region
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Region> allRegions = new List<Region>();

                    while (reader.Read())
                    {
                        var region = new Region()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            RegionName = reader.GetString(reader.GetOrdinal("RegionName"))

                        };

                        allRegions.Add(region);
                    }
                    reader.Close();

                    return Ok(allRegions);
                }
            }
        }
    }
}