using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Capstone.Models.Data;

namespace Capstone.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Bean> Bean { get; set; }
        public DbSet<Grinder> Grinder { get; set; }
        public DbSet<Region> Region { get; set; }
        public DbSet<BrewMethod> BrewMethod { get; set; }
        public DbSet<Brew> Brew { get; set; }
        public DbSet<Comment> Comment { get; set; }


        public DbSet<RefreshToken> RefreshToken { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Create a new user for Identity Framework
            ApplicationUser user = new ApplicationUser
            {
                FirstName = "admin",
                LastName = "admin",
                UserName = "admin@admin.com",
                NormalizedUserName = "ADMIN@ADMIN.COM",
                Email = "admin@admin.com",
                NormalizedEmail = "ADMIN@ADMIN.COM",
                EmailConfirmed = true,
                LockoutEnabled = false,
                SecurityStamp = "7f434309-a4d9-48e9-9ebb-8803db794577",
                Id = "00000000-ffff-ffff-ffff-ffffffffffff"
            };

            var passwordHash = new PasswordHasher<ApplicationUser>();
            user.PasswordHash = passwordHash.HashPassword(user, "Admin8*");
            modelBuilder.Entity<ApplicationUser>().HasData(user);


            modelBuilder.Entity<Bean>().HasData(
                new Bean()
                {
                    Id = 1,
                    BeanName = "Yetatebe, Shakisso",
                    RoastLevel = "Light",
                    MASL = "1900 - 2200",
                    Quantity = 340,
                    Rating = 4,
                    Origin = "Shakisso, Guji, Ethiopia",
                    TastingNotes = "Jasmine, Bergamot, Lemon Custard",
                    Variety = "Heirloom",
                    Process = "Washed",
                    Roaster = "Sightglass",
                    RegionId = 1,
                    UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
                },
                new Bean()
                {
                    Id = 2,
                    BeanName = "Colombia Gabriel Velez Gesha",
                    RoastLevel = "Light",
                    MASL = "1900",
                    Quantity = 340,
                    Rating = 5,
                    Origin = "Antioquia, Colombia",
                    TastingNotes = "Jasmine, Mango, Black Tea, Orange",
                    Variety = "Gesha",
                    Process = "Washed",
                    Roaster = "Onyx",
                    RegionId = 4,
                    UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
                }
                );

           modelBuilder.Entity<Grinder>().HasData(
           new Grinder()
           {
               Id = 1,
               Brand = "Baratza",
               Model = "Encore",
               UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
           });


            modelBuilder.Entity<Region>().HasData(
            new Region()
            {
                Id = 1,
                RegionName = "Africa"
            },
            new Region()
            {
                Id = 2,
                RegionName = "SouthEast Asia"
            },
            new Region()
            {
                Id = 3,
                RegionName = "Central America"
            },
            new Region()
            {
                Id = 4,
                RegionName = "South America"
            }
            );


            modelBuilder.Entity<BrewMethod>().HasData(
            new BrewMethod()
            {
                Id = 1,
                Method = "Chemex", 
                PaperFilter = true, 
                BrewType = "Drip"
            },
            new BrewMethod()
            {
                Id = 2,
                Method = "French Press",
                PaperFilter = false,
                BrewType = "Immersion"
            },
            new BrewMethod()
            {
                Id = 3,
                Method = "V60",
                PaperFilter = true,
                BrewType = "Drip"
            },
            new BrewMethod()
            {
                Id = 4,
                Method = "Kalita Wave",
                PaperFilter = true,
                BrewType = "Drip"
            },
            new BrewMethod()
              {
                  Id = 5,
                  Method = "AeroPress",
                  PaperFilter = true,
                  BrewType = "Immersion"
              },
            new BrewMethod()
                {
                    Id = 6,
                    Method = "Other",
                    PaperFilter = true,
                    BrewType = "Other"
                }
            );
            modelBuilder.Entity<Comment>().HasData(
                new Comment()
                {
                    Id = 1,
                    DatePosted = DateTime.Now,
                    UserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                    BrewId = 1010,
                    Text = "looks so good!"
                });
            modelBuilder.Entity<Brew>().HasData(
            new Brew()
            {
                Id = 1,
                CoffeeDose = 25, 
                WaterDose = 400, 
                WaterTemp = 205, 
                BrewTime = 120,
                Bloom = 30, 
                BrewDate = DateTime.Now,
                GrinderId = 1, 
                GrindSetting = 19, 
                BrewMethodId = 1, 
                BeanId = 1,
                UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
            },
            new Brew()
            {
                Id = 2,
                CoffeeDose = 22.3,
                WaterDose = 375,
                WaterTemp = 206,
                BrewTime = 90,
                Bloom = 30,
                BrewDate = DateTime.Now,
                GrinderId = 1,
                GrindSetting = 14,
                BrewMethodId = 3,
                BeanId = 1,
                UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
            },
            new Brew()
            {
                Id = 3,
                CoffeeDose = 40,
                WaterDose = 800,
                WaterTemp = 209,
                BrewTime = 240,
                Bloom = 0,
                BrewDate = DateTime.Now,
                GrinderId = 1,
                GrindSetting = 25,
                BrewMethodId = 2,
                BeanId = 2,
                Notes = "Makes enough for two",
                UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
            },
            new Brew()
            {
                Id = 4,
                CoffeeDose = 18,
                WaterDose = 210,
                WaterTemp = 205,
                BrewTime = 75,
                Bloom = 10,
                BrewDate = DateTime.Now,
                GrinderId = 1,
                GrindSetting = 11,
                BrewMethodId = 5,
                BeanId = 2,
                UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
            }
            );
        
        }
        }
   }
