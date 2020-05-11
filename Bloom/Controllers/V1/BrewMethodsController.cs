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
    public class BrewMethodsController : ControllerBase
    {

        private readonly IConfiguration _config;

        public BrewMethodsController(IConfiguration config)
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
                        FROM BrewMethod
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<BrewMethod> allBrewMethods = new List<BrewMethod>();

                    while (reader.Read())
                    {
                        var brewMethod = new BrewMethod()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Method = reader.GetString(reader.GetOrdinal("Method")),
                            PaperFilter = reader.GetBoolean(reader.GetOrdinal("PaperFilter")),
                            BrewType = reader.GetString(reader.GetOrdinal("BrewType")),
                        };
                        if (!reader.IsDBNull(reader.GetOrdinal("ImagePath")))
                        {
                            brewMethod.ImagePath = reader.GetString(reader.GetOrdinal("ImagePath"));
                        }
                        else
                        {
                            brewMethod.ImagePath = null;
                        }

                        allBrewMethods.Add(brewMethod);
                    }
                    reader.Close();

                    return Ok(allBrewMethods);
                }
            }
        }

        //----------GET by Id----------
        [HttpGet("{id}", Name = "GetBrewMethod")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * 
                        FROM BrewMethod 
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = cmd.ExecuteReader();

                    BrewMethod brewMethod = null;

                    if (reader.Read())
                    {
                        brewMethod = new BrewMethod()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Method = reader.GetString(reader.GetOrdinal("Method")),
                            PaperFilter = reader.GetBoolean(reader.GetOrdinal("PaperFilter")),
                            BrewType = reader.GetString(reader.GetOrdinal("BrewType"))
                        };

                        reader.Close();

                        return Ok(brewMethod);
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