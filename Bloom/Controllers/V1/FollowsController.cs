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
    public class FollowsController : ControllerBase
    {
        private IConfiguration _config;

        public FollowsController(IConfiguration config)
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
                        SELECT f.Id, f.UserId, f.FolllowId, u.Id, u.FirstName, u.LastName 
                        FROM Follow f
                        LEFT JOIN ASPNetUsers u
                        ON f.FolllowId = u.Id
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Follow> allFollows = new List<Follow>();

                    while (reader.Read())
                    {
                        var follow = new Follow()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            FolllowId = reader.GetString(reader.GetOrdinal("FolllowId")),
                            FollowUser = new ApplicationUser()
                            {
                                Id = reader.GetString(reader.GetOrdinal("FolllowId")),
                                FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                                LastName = reader.GetString(reader.GetOrdinal("LastName"))
                            }


                        };
                        allFollows.Add(follow);
                    }
                    reader.Close();

                    return Ok(allFollows);
                }
            }
        }


        //----------GET by Id----------
        [HttpGet("{id}", Name = "GetFollow")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Follow
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = cmd.ExecuteReader();

                    Follow follow = null;

                    if (reader.Read())
                    {
                        follow = new Follow()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            FolllowId = reader.GetString(reader.GetOrdinal("FolllowId"))
                        };


                        reader.Close();

                        return Ok(follow);
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
        public async Task<IActionResult> Post([FromBody] Follow follow)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Follow (UserId, FolllowId)
                        OUTPUT INSERTED.Id
                        VALUES (@UserId, @FolllowId)";

                    cmd.Parameters.Add(new SqlParameter("@UserId", follow.UserId));
                    cmd.Parameters.Add(new SqlParameter("@FolllowId", follow.FolllowId));

                    int id = (int)cmd.ExecuteScalar();

                    follow.Id = id;
                    return CreatedAtRoute("GetFollow", new { id = id }, follow);
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

                        cmd.CommandText = @"DELETE FROM Follow WHERE Id = @id";
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
                if (!FollowExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        private bool FollowExists(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id
                        FROM Follow
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));

                    SqlDataReader reader = cmd.ExecuteReader();
                    return reader.Read();
                }
            }
        }
    }
}