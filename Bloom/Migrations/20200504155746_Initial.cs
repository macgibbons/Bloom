using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BrewMethod",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Method = table.Column<string>(nullable: true),
                    PaperFilter = table.Column<bool>(nullable: false),
                    BrewType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BrewMethod", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Region",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegionName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Region", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(maxLength: 128, nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Grinder",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Brand = table.Column<string>(nullable: true),
                    Model = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grinder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Grinder_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    TokenId = table.Column<Guid>(nullable: false),
                    JwtId = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false),
                    Expires = table.Column<DateTime>(nullable: false),
                    Used = table.Column<bool>(nullable: false),
                    Invalidated = table.Column<bool>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => x.TokenId);
                    table.ForeignKey(
                        name: "FK_RefreshToken_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Bean",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BeanName = table.Column<string>(nullable: true),
                    RoastLevel = table.Column<string>(nullable: true),
                    MASL = table.Column<string>(nullable: true),
                    RoastDate = table.Column<DateTime>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Rating = table.Column<int>(nullable: false),
                    TastingNotes = table.Column<string>(nullable: true),
                    Variety = table.Column<string>(nullable: true),
                    Process = table.Column<string>(nullable: true),
                    Notes = table.Column<string>(nullable: true),
                    Origin = table.Column<string>(nullable: true),
                    Roaster = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    RegionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bean", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bean_Region_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Region",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Bean_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Brew",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CoffeeDose = table.Column<double>(nullable: false),
                    WaterDose = table.Column<double>(nullable: false),
                    WaterTemp = table.Column<int>(nullable: false),
                    Bloom = table.Column<int>(nullable: false),
                    BrewTime = table.Column<int>(nullable: false),
                    Rating = table.Column<int>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    BrewDate = table.Column<DateTime>(nullable: false),
                    GrindSetting = table.Column<int>(nullable: false),
                    GrinderId = table.Column<int>(nullable: false),
                    BrewMethodId = table.Column<int>(nullable: false),
                    BeanId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Brew", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Brew_Bean_BeanId",
                        column: x => x.BeanId,
                        principalTable: "Bean",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Brew_BrewMethod_BrewMethodId",
                        column: x => x.BrewMethodId,
                        principalTable: "BrewMethod",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Brew_Grinder_GrinderId",
                        column: x => x.GrinderId,
                        principalTable: "Grinder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Brew_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "00000000-ffff-ffff-ffff-ffffffffffff", 0, "e4e5f374-2903-46b0-9158-d1aae9355ecb", "admin@admin.com", true, "admin", "admin", false, null, "ADMIN@ADMIN.COM", "ADMIN@ADMIN.COM", "AQAAAAEAACcQAAAAELOXvEU11+GMeN3ortcbffV5C1VCozX0I2GM1JDZlUk68RFpMQxQWBCn2w5uXeRJ3w==", null, false, "7f434309-a4d9-48e9-9ebb-8803db794577", false, "admin@admin.com" });

            migrationBuilder.InsertData(
                table: "BrewMethod",
                columns: new[] { "Id", "BrewType", "Method", "PaperFilter" },
                values: new object[,]
                {
                    { 1, "Drip", "Chemex", true },
                    { 2, "Immersion", "French Press", false },
                    { 3, "Drip", "V60", true },
                    { 4, "Drip", "Kalita Wave", true },
                    { 5, "Immersion", "AeroPress", true },
                    { 6, "Other", "Other", true }
                });

            migrationBuilder.InsertData(
                table: "Region",
                columns: new[] { "Id", "RegionName" },
                values: new object[,]
                {
                    { 1, "Africa" },
                    { 2, "SouthEast Asia" },
                    { 3, "Central America" },
                    { 4, "South America" }
                });

            migrationBuilder.InsertData(
                table: "Bean",
                columns: new[] { "Id", "BeanName", "MASL", "Notes", "Origin", "Process", "Quantity", "Rating", "RegionId", "RoastDate", "RoastLevel", "Roaster", "TastingNotes", "UserId", "Variety" },
                values: new object[] { 1, "Yetatebe, Shakisso", "1900 - 2200", null, "Shakisso, Guji, Ethiopia", "Washed", 340, 4, 1, null, "Light", "Sightglass", "Jasmine, Bergamot, Lemon Custard", "00000000-ffff-ffff-ffff-ffffffffffff", "Heirloom" });

            migrationBuilder.InsertData(
                table: "Bean",
                columns: new[] { "Id", "BeanName", "MASL", "Notes", "Origin", "Process", "Quantity", "Rating", "RegionId", "RoastDate", "RoastLevel", "Roaster", "TastingNotes", "UserId", "Variety" },
                values: new object[] { 2, "Colombia Gabriel Velez Gesha", "1900", null, "Antioquia, Colombia", "Washed", 340, 5, 4, null, "Light", "Onyx", "Jasmine, Mango, Black Tea, Orange", "00000000-ffff-ffff-ffff-ffffffffffff", "Gesha" });

            migrationBuilder.InsertData(
                table: "Grinder",
                columns: new[] { "Id", "Brand", "Model", "UserId" },
                values: new object[] { 1, "Baratza", "Encore", "00000000-ffff-ffff-ffff-ffffffffffff" });

            migrationBuilder.InsertData(
                table: "Brew",
                columns: new[] { "Id", "BeanId", "Bloom", "BrewDate", "BrewMethodId", "BrewTime", "CoffeeDose", "GrindSetting", "GrinderId", "Notes", "Rating", "UserId", "WaterDose", "WaterTemp" },
                values: new object[,]
                {
                    { 1, 1, 30, new DateTime(2020, 5, 4, 10, 57, 46, 395, DateTimeKind.Local).AddTicks(2242), 1, 120, 25.0, 19, 1, null, 0, "00000000-ffff-ffff-ffff-ffffffffffff", 400.0, 205 },
                    { 2, 1, 30, new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(5955), 3, 90, 22.300000000000001, 14, 1, null, 0, "00000000-ffff-ffff-ffff-ffffffffffff", 375.0, 206 },
                    { 3, 2, 0, new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(6045), 2, 240, 40.0, 25, 1, "Makes enough for two", 0, "00000000-ffff-ffff-ffff-ffffffffffff", 800.0, 209 },
                    { 4, 2, 10, new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(6510), 5, 75, 18.0, 11, 1, null, 0, "00000000-ffff-ffff-ffff-ffffffffffff", 210.0, 205 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Bean_RegionId",
                table: "Bean",
                column: "RegionId");

            migrationBuilder.CreateIndex(
                name: "IX_Bean_UserId",
                table: "Bean",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Brew_BeanId",
                table: "Brew",
                column: "BeanId");

            migrationBuilder.CreateIndex(
                name: "IX_Brew_BrewMethodId",
                table: "Brew",
                column: "BrewMethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Brew_GrinderId",
                table: "Brew",
                column: "GrinderId");

            migrationBuilder.CreateIndex(
                name: "IX_Brew_UserId",
                table: "Brew",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Grinder_UserId",
                table: "Grinder",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_UserId",
                table: "RefreshToken",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Brew");

            migrationBuilder.DropTable(
                name: "RefreshToken");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Bean");

            migrationBuilder.DropTable(
                name: "BrewMethod");

            migrationBuilder.DropTable(
                name: "Grinder");

            migrationBuilder.DropTable(
                name: "Region");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
