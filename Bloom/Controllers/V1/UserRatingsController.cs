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
    public class UserRatingsController : ControllerBase
    {
        private IConfiguration _config;

        public UserRatingsController(IConfiguration config)
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
                        FROM UserRating 
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<UserRating> allUserRatings = new List<UserRating>();

                    while (reader.Read())
                    {
                        var rating = new UserRating()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            BrewId = reader.GetInt32(reader.GetOrdinal("BrewId")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating"))
                        };


                        allUserRatings.Add(rating);
                    }
                    reader.Close();

                    return Ok(allUserRatings);
                }
            }
        }

        //----------GET by Id----------
        [HttpGet("{id}", Name = "GetUserRating")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM UserRating
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = cmd.ExecuteReader();

                    UserRating rating = null;

                    if (reader.Read())
                    {
                        rating = new UserRating()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            BrewId = reader.GetInt32(reader.GetOrdinal("BrewId")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating"))
                        };


                        reader.Close();

                        return Ok(rating);
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
        public async Task<IActionResult> Post([FromBody] UserRating rating)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserRating (Rating, BrewId, UserId)
                        OUTPUT INSERTED.Id
                        VALUES (@Rating, @BrewId, @UserId)";

                    cmd.Parameters.Add(new SqlParameter("@Rating", rating.Rating));
                    cmd.Parameters.Add(new SqlParameter("@BrewId", rating.BrewId));
                    cmd.Parameters.Add(new SqlParameter("@UserId", rating.UserId));

                    int id = (int)cmd.ExecuteScalar();

                    rating.Id = id;
                    return CreatedAtRoute("GetUserRating", new { id = id }, rating);
                }
            }
        }

        ////////----------PUT----------
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] UserRating rating)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE UserRating
                                     SET Rating = @Rating, BrewId = @BrewId, UserId = @UserId
                                     WHERE Id = @id";

                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        cmd.Parameters.Add(new SqlParameter("@Rating", rating.Rating));
                        cmd.Parameters.Add(new SqlParameter("@BrewId", rating.BrewId));
                        cmd.Parameters.Add(new SqlParameter("@UserId", rating.UserId));


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
                if (!UserRatingExists(id))
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

                        cmd.CommandText = @"DELETE FROM UserRating WHERE Id = @id";
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
                if (!UserRatingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        private bool UserRatingExists(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id
                        FROM UserRating
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));

                    SqlDataReader reader = cmd.ExecuteReader();
                    return reader.Read();
                }
            }
        }
    }
}