using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class commentseed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    BrewId = table.Column<int>(nullable: false),
                    DatePosted = table.Column<DateTime>(nullable: false),
                    Text = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_Brew_BrewId",
                        column: x => x.BrewId,
                        principalTable: "Brew",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comment_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "89e0fa12-2cfe-4092-a262-55ac18ee50d2", "AQAAAAEAACcQAAAAEL14asUvFcSZ9+dIztG8shSD4hX/gogyEct/R50VOUhuhg78ThHiLotSHIQbUzRBAQ==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 13, 37, 54, DateTimeKind.Local).AddTicks(4135));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 13, 37, 54, DateTimeKind.Local).AddTicks(6795));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 13, 37, 54, DateTimeKind.Local).AddTicks(6865));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 13, 37, 54, DateTimeKind.Local).AddTicks(7281));

            migrationBuilder.InsertData(
                table: "Comment",
                columns: new[] { "Id", "BrewId", "DatePosted", "Text", "UserId" },
                values: new object[] { 1, 1010, new DateTime(2020, 5, 12, 14, 13, 37, 51, DateTimeKind.Local).AddTicks(9738), "looks so good!", "00000000-ffff-ffff-ffff-ffffffffffff" });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_BrewId",
                table: "Comment",
                column: "BrewId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_UserId",
                table: "Comment",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "9a7407d0-3fc4-4c2e-819b-f81d75ec3135", "AQAAAAEAACcQAAAAEOvUhBv0+TDjs9TZErSK4AY4oYjXncM903658kJGZnuWwAMF6PbdIDM9uVHo0deTWg==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 8, 5, 259, DateTimeKind.Local).AddTicks(9565));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 8, 5, 262, DateTimeKind.Local).AddTicks(2472));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 8, 5, 262, DateTimeKind.Local).AddTicks(2563));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 14, 8, 5, 262, DateTimeKind.Local).AddTicks(3128));
        }
    }
}
