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
    public class CommentsController : ControllerBase
    {
        private readonly IConfiguration _config;

        public CommentsController(IConfiguration config)
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
                        FROM Comment 
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Comment> allComments = new List<Comment>();

                    while (reader.Read())
                    {
                        var comment = new Comment()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            DatePosted = reader.GetDateTime(reader.GetOrdinal("DatePosted")),
                            Text = reader.GetString(reader.GetOrdinal("Text")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            BrewId = reader.GetInt32(reader.GetOrdinal("BrewId")),

                        };


                        allComments.Add(comment);
                    }
                    reader.Close();

                    return Ok(allComments);
                }
            }
        }


        //----------GET by Id----------
        [HttpGet("{id}", Name = "GetComment")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Comment
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = cmd.ExecuteReader();

                    Comment comment = null;

                    if (reader.Read())
                    {
                        comment = new Comment()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            DatePosted = reader.GetDateTime(reader.GetOrdinal("DatePosted")),
                            Text = reader.GetString(reader.GetOrdinal("Text")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            BrewId = reader.GetInt32(reader.GetOrdinal("BrewId")),
                        };


                        reader.Close();

                        return Ok(comment);
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
        public async Task<IActionResult> Post([FromBody] Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Comment (Text, DatePosted, UserId, BrewId)
                        OUTPUT INSERTED.Id
                        VALUES (@Text, @DatePosted,  @UserId, @BrewId)";

                    cmd.Parameters.Add(new SqlParameter("@Text", comment.Text));
                    cmd.Parameters.Add(new SqlParameter("@DatePosted", comment.DatePosted));
                    cmd.Parameters.Add(new SqlParameter("@UserId", comment.UserId));
                    cmd.Parameters.Add(new SqlParameter("@BrewId", comment.BrewId));

                    int id = (int)cmd.ExecuteScalar();

                    comment.Id = id;
                    return CreatedAtRoute("GetComment", new { id = id }, comment);
                }
            }
        }

        ////////----------PUT----------
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Comment comment)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE Comment
                                     SET Text = @Text, DatePosted = @DatePosted, BrewId = @BrewId, UserId = @UserId
                                     WHERE Id = @id";

                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        cmd.Parameters.Add(new SqlParameter("@Text", comment.Text));
                        cmd.Parameters.Add(new SqlParameter("@DatePosted", comment.DatePosted));
                        cmd.Parameters.Add(new SqlParameter("@UserId", comment.UserId));
                        cmd.Parameters.Add(new SqlParameter("@BrewId", comment.BrewId));



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
                if (!CommentExists(id))
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

                        cmd.CommandText = @"DELETE FROM Comment WHERE Id = @id";
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
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        private bool CommentExists(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id
                        FROM Comment
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));

                    SqlDataReader reader = cmd.ExecuteReader();
                    return reader.Read();
                }
            }
        }
    }
}