﻿// <auto-generated />
using System;
using Capstone.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Capstone.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20200504155746_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Capstone.Models.Data.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasData(
                        new
                        {
                            Id = "00000000-ffff-ffff-ffff-ffffffffffff",
                            AccessFailedCount = 0,
                            ConcurrencyStamp = "e4e5f374-2903-46b0-9158-d1aae9355ecb",
                            Email = "admin@admin.com",
                            EmailConfirmed = true,
                            FirstName = "admin",
                            LastName = "admin",
                            LockoutEnabled = false,
                            NormalizedEmail = "ADMIN@ADMIN.COM",
                            NormalizedUserName = "ADMIN@ADMIN.COM",
                            PasswordHash = "AQAAAAEAACcQAAAAELOXvEU11+GMeN3ortcbffV5C1VCozX0I2GM1JDZlUk68RFpMQxQWBCn2w5uXeRJ3w==",
                            PhoneNumberConfirmed = false,
                            SecurityStamp = "7f434309-a4d9-48e9-9ebb-8803db794577",
                            TwoFactorEnabled = false,
                            UserName = "admin@admin.com"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.Bean", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BeanName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MASL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Origin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Process")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("RegionId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("RoastDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("RoastLevel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Roaster")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TastingNotes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Variety")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RegionId");

                    b.HasIndex("UserId");

                    b.ToTable("Bean");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BeanName = "Yetatebe, Shakisso",
                            MASL = "1900 - 2200",
                            Origin = "Shakisso, Guji, Ethiopia",
                            Process = "Washed",
                            Quantity = 340,
                            Rating = 4,
                            RegionId = 1,
                            RoastLevel = "Light",
                            Roaster = "Sightglass",
                            TastingNotes = "Jasmine, Bergamot, Lemon Custard",
                            UserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            Variety = "Heirloom"
                        },
                        new
                        {
                            Id = 2,
                            BeanName = "Colombia Gabriel Velez Gesha",
                            MASL = "1900",
                            Origin = "Antioquia, Colombia",
                            Process = "Washed",
                            Quantity = 340,
                            Rating = 5,
                            RegionId = 4,
                            RoastLevel = "Light",
                            Roaster = "Onyx",
                            TastingNotes = "Jasmine, Mango, Black Tea, Orange",
                            UserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            Variety = "Gesha"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.Brew", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BeanId")
                        .HasColumnType("int");

                    b.Property<int>("Bloom")
                        .HasColumnType("int");

                    b.Property<DateTime>("BrewDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("BrewMethodId")
                        .HasColumnType("int");

                    b.Property<int>("BrewTime")
                        .HasColumnType("int");

                    b.Property<double>("CoffeeDose")
                        .HasColumnType("float");

                    b.Property<int>("GrindSetting")
                        .HasColumnType("int");

                    b.Property<int>("GrinderId")
                        .HasColumnType("int");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("WaterDose")
                        .HasColumnType("float");

                    b.Property<int>("WaterTemp")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BeanId");

                    b.HasIndex("BrewMethodId");

                    b.HasIndex("GrinderId");

                    b.HasIndex("UserId");

                    b.ToTable("Brew");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BeanId = 1,
                            Bloom = 30,
                            BrewDate = new DateTime(2020, 5, 4, 10, 57, 46, 395, DateTimeKind.Local).AddTicks(2242),
                            BrewMethodId = 1,
                            BrewTime = 120,
                            CoffeeDose = 25.0,
                            GrindSetting = 19,
                            GrinderId = 1,
                            Rating = 0,
                            UserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            WaterDose = 400.0,
                            WaterTemp = 205
                        },
                        new
                        {
                            Id = 2,
                            BeanId = 1,
                            Bloom = 30,
                            BrewDate = new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(5955),
                            BrewMethodId = 3,
                            BrewTime = 90,
                            CoffeeDose = 22.300000000000001,
                            GrindSetting = 14,
                            GrinderId = 1,
                            Rating = 0,
                            UserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            WaterDose = 375.0,
                            WaterTemp = 206
                        },
                        new
                        {
                            Id = 3,
                            BeanId = 2,
                            Bloom = 0,
                            BrewDate = new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(6045),
                            BrewMethodId = 2,
                            BrewTime = 240,
                            CoffeeDose = 40.0,
                            GrindSetting = 25,
                            GrinderId = 1,
                            Notes = "Makes enough for two",
                            Rating = 0,
                            UserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            WaterDose = 800.0,
                            WaterTemp = 209
                        },
                        new
                        {
                            Id = 4,
                            BeanId = 2,
                            Bloom = 10,
                            BrewDate = new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(6510),
                            BrewMethodId = 5,
                            BrewTime = 75,
                            CoffeeDose = 18.0,
                            GrindSetting = 11,
                            GrinderId = 1,
                            Rating = 0,
                            UserId = "00000000-ffff-ffff-ffff-ffffffffffff",
                            WaterDose = 210.0,
                            WaterTemp = 205
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.BrewMethod", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BrewType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Method")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PaperFilter")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("BrewMethod");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            BrewType = "Drip",
                            Method = "Chemex",
                            PaperFilter = true
                        },
                        new
                        {
                            Id = 2,
                            BrewType = "Immersion",
                            Method = "French Press",
                            PaperFilter = false
                        },
                        new
                        {
                            Id = 3,
                            BrewType = "Drip",
                            Method = "V60",
                            PaperFilter = true
                        },
                        new
                        {
                            Id = 4,
                            BrewType = "Drip",
                            Method = "Kalita Wave",
                            PaperFilter = true
                        },
                        new
                        {
                            Id = 5,
                            BrewType = "Immersion",
                            Method = "AeroPress",
                            PaperFilter = true
                        },
                        new
                        {
                            Id = 6,
                            BrewType = "Other",
                            Method = "Other",
                            PaperFilter = true
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.Grinder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Grinder");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Brand = "Baratza",
                            Model = "Encore",
                            UserId = "00000000-ffff-ffff-ffff-ffffffffffff"
                        });
                });

            modelBuilder.Entity("Capstone.Models.Data.RefreshToken", b =>
                {
                    b.Property<Guid>("TokenId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Invalidated")
                        .HasColumnType("bit");

                    b.Property<string>("JwtId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Used")
                        .HasColumnType("bit");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("TokenId");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshToken");
                });

            modelBuilder.Entity("Capstone.Models.Data.Region", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RegionName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Region");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RegionName = "Africa"
                        },
                        new
                        {
                            Id = 2,
                            RegionName = "SouthEast Asia"
                        },
                        new
                        {
                            Id = 3,
                            RegionName = "Central America"
                        },
                        new
                        {
                            Id = 4,
                            RegionName = "South America"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(128)")
                        .HasMaxLength(128);

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Capstone.Models.Data.Bean", b =>
                {
                    b.HasOne("Capstone.Models.Data.Region", "Region")
                        .WithMany()
                        .HasForeignKey("RegionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Capstone.Models.Data.Brew", b =>
                {
                    b.HasOne("Capstone.Models.Data.Bean", "Bean")
                        .WithMany()
                        .HasForeignKey("BeanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.BrewMethod", "BrewMethod")
                        .WithMany()
                        .HasForeignKey("BrewMethodId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.Grinder", "Grinder")
                        .WithMany()
                        .HasForeignKey("GrinderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Capstone.Models.Data.Grinder", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Capstone.Models.Data.RefreshToken", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Capstone.Models.Data.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
