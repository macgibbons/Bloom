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
    public class BeansController : ControllerBase
    {
        private readonly IConfiguration _config;

        public BeansController(IConfiguration config)
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
                        FROM Bean 
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Bean> allBeans = new List<Bean>();

                    while (reader.Read())
                    {
                        var bean = new Bean()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            BeanName = reader.GetString(reader.GetOrdinal("BeanName")),
                            RoastLevel = reader.GetString(reader.GetOrdinal("RoastLevel")),
                            Roaster = reader.GetString(reader.GetOrdinal("Roaster")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating")),
                            MASL = reader.GetString(reader.GetOrdinal("MASL")),
                            Quantity = reader.GetInt32(reader.GetOrdinal("Quantity")),
                            TastingNotes = reader.GetString(reader.GetOrdinal("TastingNotes")),
                            Variety = reader.GetString(reader.GetOrdinal("Variety")),
                            Process = reader.GetString(reader.GetOrdinal("Process")),
                            Origin = reader.GetString(reader.GetOrdinal("Origin")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            RegionId = reader.GetInt32(reader.GetOrdinal("RegionId"))
                        };
                        if (!reader.IsDBNull(reader.GetOrdinal("RoastDate")))
                        {
                            bean.RoastDate = reader.GetDateTime(reader.GetOrdinal("RoastDate"));
                        }
                        else
                        {
                            bean.RoastDate = null;
                        }
                        if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                        {
                            bean.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                        }
                        else
                        {
                            bean.Notes = null;
                        }

                        allBeans.Add(bean);
                    }
                    reader.Close();

                    return Ok(allBeans);
                }
            }
        }

        //----------GET by Id----------
        [HttpGet("{id}", Name = "GetBean")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.BeanName, b.RoastLevel, b.Roaster, b.Rating, b.MASL, b.Quantity, b.TastingNotes,
                        b.Variety, b.Process, b.Origin, b.UserId, b.RoastDate, b.Notes, b.RegionId, r.Id, r.RegionName
                        FROM Bean b
                        LEFT JOIN Region r
                        ON b.RegionId = r.Id
                        WHERE b.Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = cmd.ExecuteReader();

                    Bean bean = null;

                    if (reader.Read())
                    {
                        bean = new Bean()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            BeanName = reader.GetString(reader.GetOrdinal("BeanName")),
                            RoastLevel = reader.GetString(reader.GetOrdinal("RoastLevel")),
                            Roaster = reader.GetString(reader.GetOrdinal("Roaster")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating")),
                            MASL = reader.GetString(reader.GetOrdinal("MASL")),
                            Quantity = reader.GetInt32(reader.GetOrdinal("Quantity")),
                            TastingNotes = reader.GetString(reader.GetOrdinal("TastingNotes")),
                            Variety = reader.GetString(reader.GetOrdinal("Variety")),
                            Process = reader.GetString(reader.GetOrdinal("Process")),
                            Origin = reader.GetString(reader.GetOrdinal("Origin")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            RegionId = reader.GetInt32(reader.GetOrdinal("RegionId")),
                            Region = new Region()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("RegionId")),
                                RegionName = reader.GetString(reader.GetOrdinal("RegionName")),
                                
                            }

                        };
                        if (!reader.IsDBNull(reader.GetOrdinal("RoastDate")))
                        {
                            bean.RoastDate = reader.GetDateTime(reader.GetOrdinal("RoastDate"));
                        }
                        else
                        {
                            bean.RoastDate = null;
                        }
                        if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                        {
                            bean.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                        }
                        else
                        {
                            bean.Notes = null;
                        }

                        reader.Close();

                        return Ok(bean);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
        }

    }
}