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
    public class BrewsController : ControllerBase
    {

        private readonly IConfiguration _config;

        public BrewsController(IConfiguration config)
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
                        SELECT b.Id, b.CoffeeDose, b.WaterDose, b.WaterTemp, b.Notes, b.GrindSetting, b.GrinderId,  b.BrewDate, b.Rating, b.BrewTime, b.UserId, b.BeanId, b.BrewMethodId,
                               c.Id, c.BeanName, c.Origin, c.Roaster, 
                               bm.Method, bm.Id 
                        FROM Brew b
                        LEFT JOIN Bean c
                        ON b.BeanId = c.Id
                        LEFT JOIN BrewMethod bm
                        ON b.BrewMethodId = bm.Id
                        WHERE 1 = 1 
                        ";


                    SqlDataReader reader = cmd.ExecuteReader();

                    List<Brew> allBrews = new List<Brew>();

                    while (reader.Read())
                    {
                        var brew = new Brew()
                        {

                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            CoffeeDose = reader.GetDouble(reader.GetOrdinal("CoffeeDose")),
                            WaterDose = reader.GetDouble(reader.GetOrdinal("WaterDose")),
                            BrewDate = reader.GetDateTime(reader.GetOrdinal("BrewDate")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating")),
                            BrewTime = reader.GetInt32(reader.GetOrdinal("BrewTime")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            BeanId = reader.GetInt32(reader.GetOrdinal("BeanId")),
                            WaterTemp = reader.GetInt32(reader.GetOrdinal("WaterTemp")),
                            GrindSetting = reader.GetInt32(reader.GetOrdinal("GrindSetting")),
                            GrinderId = reader.GetInt32(reader.GetOrdinal("GrinderId")),
                            BrewMethodId = reader.GetInt32(reader.GetOrdinal("BrewMethodId")),
                            Bean = new Bean()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("BeanId")),
                                BeanName = reader.GetString(reader.GetOrdinal("BeanName")),
                                Origin = reader.GetString(reader.GetOrdinal("Origin")),
                                Roaster = reader.GetString(reader.GetOrdinal("Roaster"))
                            },
                            BrewMethod = new BrewMethod()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("BrewMethodId")),
                                Method = reader.GetString(reader.GetOrdinal("Method")),
                            }
                        };
                        if (!reader.IsDBNull(reader.GetOrdinal("Notes")))
                        {
                            brew.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                        }
                        else
                        {
                            brew.Notes = null;
                        }

                        allBrews.Add(brew);
                    }
                    reader.Close();

                    return Ok(allBrews);
                }
            }
        }

        //----------GET by Id----------
        [HttpGet("{id}", Name = "GetBrew")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.CoffeeDose, b.WaterDose, b.BrewDate, b.Rating, b.BrewTime, b.UserId, b.BeanId, 
                        b.WaterTemp, b.Bloom, b.Notes, b.GrindSetting, b.GrinderId, b.BrewMethodId,
                        c.Id, c.BeanName, c.Origin, c.Roaster, 
                        g.Id, g.Brand, g.Model,
                        bm.Method, bm.Id 
                        FROM Brew b
                        LEFT JOIN Bean c
                        ON b.BeanId = c.Id
                        LEFT JOIN Grinder g
                        ON b.GrinderId = g.Id
                        LEFT JOIN BrewMethod bm
                        ON b.BrewMethodId = bm.Id
                        WHERE b.Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));
                    SqlDataReader reader = cmd.ExecuteReader();

                    Brew brew = null;

                    if (reader.Read())
                    {
                        brew = new Brew()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            CoffeeDose = reader.GetDouble(reader.GetOrdinal("CoffeeDose")),
                            WaterDose = reader.GetDouble(reader.GetOrdinal("WaterDose")),
                            BrewDate = reader.GetDateTime(reader.GetOrdinal("BrewDate")),
                            Rating = reader.GetInt32(reader.GetOrdinal("Rating")),
                            BrewTime = reader.GetInt32(reader.GetOrdinal("BrewTime")),
                            WaterTemp = reader.GetInt32(reader.GetOrdinal("WaterTemp")),
                            Bloom = reader.GetInt32(reader.GetOrdinal("Bloom")),
                            GrindSetting = reader.GetInt32(reader.GetOrdinal("GrindSetting")),
                            UserId = reader.GetString(reader.GetOrdinal("UserId")),
                            GrinderId = reader.GetInt32(reader.GetOrdinal("GrinderId")),
                            BeanId = reader.GetInt32(reader.GetOrdinal("BeanId")),
                            Bean = new Bean()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("BeanId")),
                                BeanName = reader.GetString(reader.GetOrdinal("BeanName")),
                                Origin = reader.GetString(reader.GetOrdinal("Origin")),
                                Roaster = reader.GetString(reader.GetOrdinal("Roaster"))
                            },
                            Grinder = new Grinder()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("GrinderId")),
                                Brand = reader.GetString(reader.GetOrdinal("Brand")),
                                Model = reader.GetString(reader.GetOrdinal("Model")),
                            },
                            BrewMethod = new BrewMethod()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("BrewMethodId")),
                                Method = reader.GetString(reader.GetOrdinal("Method")),
                            }

                        };
                        if(!reader.IsDBNull(reader.GetOrdinal("Notes")))
                        {
                            brew.Notes = reader.GetString(reader.GetOrdinal("Notes"));
                        }
                        else
                        {
                            brew.Notes = null;
                        }

                        reader.Close();

                        return Ok(brew);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
            }
        }


        ////----------POST----------

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Brew brew)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Brew (CoffeeDose, WaterDose, WaterTemp, Bloom, BrewTime, Rating, BrewDate, GrindSetting, GrinderId, Notes, BrewMethodId, BeanId, UserId)
                        OUTPUT INSERTED.Id
                        VALUES (@CoffeeDose, @WaterDose, @WaterTemp, @Bloom, @BrewTime, @Rating, @BrewDate, @GrindSetting, @GrinderId, @Notes, @BrewMethodId, @BeanId, @UserId)";

                    cmd.Parameters.Add(new SqlParameter("@CoffeeDose", brew.CoffeeDose));
                    cmd.Parameters.Add(new SqlParameter("@WaterDose", brew.WaterDose));
                    cmd.Parameters.Add(new SqlParameter("@WaterTemp", brew.WaterTemp));
                    cmd.Parameters.Add(new SqlParameter("@Bloom", brew.Bloom));
                    cmd.Parameters.Add(new SqlParameter("@BrewTime", brew.BrewTime));
                    cmd.Parameters.Add(new SqlParameter("@Rating", brew.Rating));
                    cmd.Parameters.Add(new SqlParameter("@BrewDate", brew.BrewDate));
                    cmd.Parameters.Add(new SqlParameter("@GrindSetting", brew.GrindSetting));
                    cmd.Parameters.Add(new SqlParameter("@GrinderId", brew.GrinderId));
                    cmd.Parameters.Add(new SqlParameter("@Notes", brew.Notes));
                    cmd.Parameters.Add(new SqlParameter("@BrewMethodId", brew.BrewMethodId));
                    cmd.Parameters.Add(new SqlParameter("@BeanId", brew.BeanId));
                    cmd.Parameters.Add(new SqlParameter("@UserId", brew.UserId));

                    int id = (int)cmd.ExecuteScalar();

                    brew.Id = id;
                    return CreatedAtRoute("GetBrew", new { id = id }, brew);
                }
            }
        }

        ////////----------PUT----------
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromRoute] int id, [FromBody] Brew brew)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"UPDATE Brew
                                     SET CoffeeDose = @CoffeeDose, WaterDose = @WaterDose, WaterTemp = @WaterTemp, Bloom = @Bloom, BrewTime = @BrewTime, 
                                     Rating = @Rating, BrewDate = @BrewDate, GrindSetting = @GrindSetting, GrinderId = @GrinderId, Notes = @Notes, BrewMethodId = @BrewMethodId,
                                     BeanId = @BeanId, UserId = @UserId
                                     WHERE Id = @id";

                        cmd.Parameters.Add(new SqlParameter("@id", id));
                        cmd.Parameters.Add(new SqlParameter("@CoffeeDose", brew.CoffeeDose));
                        cmd.Parameters.Add(new SqlParameter("@WaterDose", brew.WaterDose));
                        cmd.Parameters.Add(new SqlParameter("@WaterTemp", brew.WaterTemp));
                        cmd.Parameters.Add(new SqlParameter("@Bloom", brew.Bloom));
                        cmd.Parameters.Add(new SqlParameter("@BrewTime", brew.BrewTime));
                        cmd.Parameters.Add(new SqlParameter("@Rating", brew.Rating));
                        cmd.Parameters.Add(new SqlParameter("@BrewDate", brew.BrewDate));
                        cmd.Parameters.Add(new SqlParameter("@GrindSetting", brew.GrindSetting));
                        cmd.Parameters.Add(new SqlParameter("@GrinderId", brew.GrinderId));
                        cmd.Parameters.Add(new SqlParameter("@Notes", brew.Notes));
                        cmd.Parameters.Add(new SqlParameter("@BrewMethodId", brew.BrewMethodId));
                        cmd.Parameters.Add(new SqlParameter("@BeanId", brew.BeanId));
                        cmd.Parameters.Add(new SqlParameter("@UserId", brew.UserId));


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
                if (!BrewExists(id))
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

                        cmd.CommandText = @"DELETE FROM Brew WHERE Id = @id";
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
                if (!BrewExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        private bool BrewExists(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, BrewName
                        FROM Brew
                        WHERE Id = @id";
                    cmd.Parameters.Add(new SqlParameter("@id", id));

                    SqlDataReader reader = cmd.ExecuteReader();
                    return reader.Read();
                }
            }
        }
    }
}