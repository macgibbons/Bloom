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


        //----------POST----------

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Bean bean)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Bean (BeanName, RoastLevel, MASL, RoastDate, Quantity, Rating, TastingNotes, Variety, Process, Notes, Origin, Roaster, UserId, RegionId)
                        OUTPUT INSERTED.Id
                        VALUES (@BeanName, @RoastLevel, @MASL, @RoastDate, @Quantity, @Rating, @TastingNotes, @Variety, @Process, @Notes, @Origin, @Roaster, @UserId, @RegionId)";

                    cmd.Parameters.Add(new SqlParameter("@BeanName", bean.BeanName));
                    cmd.Parameters.Add(new SqlParameter("@RoastLevel", bean.RoastLevel));
                    cmd.Parameters.Add(new SqlParameter("@MASL", bean.MASL));
                    cmd.Parameters.Add(new SqlParameter("@RoastDate", bean.RoastDate));
                    cmd.Parameters.Add(new SqlParameter("@Quantity", bean.Quantity));
                    cmd.Parameters.Add(new SqlParameter("@Rating", bean.Rating));
                    cmd.Parameters.Add(new SqlParameter("@TastingNotes", bean.TastingNotes));
                    cmd.Parameters.Add(new SqlParameter("@Variety", bean.Variety));
                    cmd.Parameters.Add(new SqlParameter("@Process", bean.Process));
                    cmd.Parameters.Add(new SqlParameter("@Notes", bean.Notes));
                    cmd.Parameters.Add(new SqlParameter("@Origin", bean.Origin));
                    cmd.Parameters.Add(new SqlParameter("@Roaster", bean.Roaster));
                    cmd.Parameters.Add(new SqlParameter("@UserId", bean.UserId));
                    cmd.Parameters.Add(new SqlParameter("@RegionId", bean.RegionId));

                    int id = (int)cmd.ExecuteScalar();

                    bean.Id = id;
                    return CreatedAtRoute("GetBean", new { id = id }, bean);
                }
            }
        }

        ////////----------PUT----------
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Bean bean)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE Bean
                                     SET BeanName = @BeanName, RoastLevel = @RoastLevel, MASL = @MASL, RoastDate = @RoastDate, Quantity = @Quantity, 
                                     Rating = @Rating, TastingNotes = @TastingNotes, Variety = @Variety, Process = @Process, Notes = @Notes, Origin = @Origin,
                                     Roaster = @Roaster, UserId = @UserId, RegionId = @RegionId 
                                     WHERE Id = @id";

                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        cmd.Parameters.Add(new SqlParameter("@BeanName", bean.BeanName));
                        cmd.Parameters.Add(new SqlParameter("@RoastLevel", bean.RoastLevel));
                        cmd.Parameters.Add(new SqlParameter("@MASL", bean.MASL));
                        cmd.Parameters.Add(new SqlParameter("@RoastDate", bean.RoastDate));
                        cmd.Parameters.Add(new SqlParameter("@Quantity", bean.Quantity));
                        cmd.Parameters.Add(new SqlParameter("@Rating", bean.Rating));
                        cmd.Parameters.Add(new SqlParameter("@TastingNotes", bean.TastingNotes));
                        cmd.Parameters.Add(new SqlParameter("@Variety", bean.Variety));
                        cmd.Parameters.Add(new SqlParameter("@Process", bean.Process));
                        cmd.Parameters.Add(new SqlParameter("@Notes", bean.Notes));
                        cmd.Parameters.Add(new SqlParameter("@Origin", bean.Origin));
                        cmd.Parameters.Add(new SqlParameter("@Roaster", bean.Roaster));
                        cmd.Parameters.Add(new SqlParameter("@UserId", bean.UserId));
                        cmd.Parameters.Add(new SqlParameter("@RegionId", bean.RegionId));


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
                if (!BeanExists(id))
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

                        cmd.CommandText = @"DELETE FROM Bean WHERE Id = @id";
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
                if (!BeanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        private bool BeanExists(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, BeanName
                        FROM Bean
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));

                    SqlDataReader reader = cmd.ExecuteReader();
                    return reader.Read();
                }
            }
        }
    }
}