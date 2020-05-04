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
    public class GrindersController : ControllerBase
    {
        private readonly IConfiguration _config;

        public GrindersController(IConfiguration config)
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
                        FROM Grinder 
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Grinder> allGrinders = new List<Grinder>();

                    while (reader.Read())
                    {
                        var grinder = new Grinder()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Brand = reader.GetString(reader.GetOrdinal("Brand")),
                            Model = reader.GetString(reader.GetOrdinal("Model")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId"))
                        };
                        

                        allGrinders.Add(grinder);
                    }
                    reader.Close();

                    return Ok(allGrinders);
                }
            }
        }

        //----------GET by Id----------
        [HttpGet("{id}", Name = "GetGrinder")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Grinder
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = cmd.ExecuteReader();

                    Grinder grinder = null;

                    if (reader.Read())
                    {
                        grinder = new Grinder()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Brand = reader.GetString(reader.GetOrdinal("Brand")),
                            Model = reader.GetString(reader.GetOrdinal("Model")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId"))
                        };
                       

                        reader.Close();

                        return Ok(grinder);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
        }


        //----------POST----------

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Grinder grinder)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Grinder (Brand, Model, UserId)
                        OUTPUT INSERTED.Id
                        VALUES (@Brand, @Model, @UserId)";

                    cmd.Parameters.Add(new SqlParameter("@Brand", grinder.Brand));
                    cmd.Parameters.Add(new SqlParameter("@Model", grinder.Model));
                    cmd.Parameters.Add(new SqlParameter("@UserId", grinder.UserId));

                    int id = (int)cmd.ExecuteScalar();

                    grinder.Id = id;
                    return CreatedAtRoute("GetGrinder", new { id = id }, grinder);
                }
            }
        }

        ////////----------PUT----------
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Grinder grinder)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE Grinder
                                     SET Brand = @Brand, Model = @Model, UserId = @UserId
                                     WHERE Id = @id";

                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        cmd.Parameters.Add(new SqlParameter("@Brand", grinder.Brand));
                        cmd.Parameters.Add(new SqlParameter("@Model", grinder.Model));
                        cmd.Parameters.Add(new SqlParameter("@UserId", grinder.UserId));


                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return new StatusCodeResult(StatusCodes.Status204NoContent);
                        }
                        throw new Exception("No rows affected");
                    }
                }
            }
            catch (Exception)
            {
                if (!GrinderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        ///////----------DELETE----------
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {

            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {

                        cmd.CommandText = @"DELETE FROM Grinder WHERE Id = @id";
                        cmd.Parameters.Add(new SqlParameter("@id", id));

                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return new StatusCodeResult(StatusCodes.Status204NoContent);
                        }
                        throw new Exception("No rows affected");

                    }
                }
            }
            catch (Exception)
            {
                if (!GrinderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        private bool GrinderExists(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id
                        FROM Grinder
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));

                    SqlDataReader reader = cmd.ExecuteReader();
                    return reader.Read();
                }
            }
        }
    }
}