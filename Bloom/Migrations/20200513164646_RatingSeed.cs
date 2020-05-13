using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class RatingSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserRating",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrewId = table.Column<int>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRating_Brew_BrewId",
                        column: x => x.BrewId,
                        principalTable: "Brew",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRating_AspNetUsers_UserId",
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
                values: new object[] { "e07c669f-bffd-4933-8ceb-344c08f7f1a9", "AQAAAAEAACcQAAAAEFoRqeOJAIgj1am4vuJWqYxIn2H6/9LbqzvQHzxRjW+vFyOJ4wTQGkLpuwzvAvSApw==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 13, 11, 46, 46, 63, DateTimeKind.Local).AddTicks(6498));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 13, 11, 46, 46, 63, DateTimeKind.Local).AddTicks(8955));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 13, 11, 46, 46, 63, DateTimeKind.Local).AddTicks(9058));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 13, 11, 46, 46, 63, DateTimeKind.Local).AddTicks(9481));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "DatePosted",
                value: new DateTime(2020, 5, 13, 11, 46, 46, 61, DateTimeKind.Local).AddTicks(2038));

            migrationBuilder.InsertData(
                table: "UserRating",
                columns: new[] { "Id", "BrewId", "Rating", "UserId" },
                values: new object[] { 1, 1012, 4, "00000000-ffff-ffff-ffff-ffffffffffff" });

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_BrewId",
                table: "UserRating",
                column: "BrewId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRating_UserId",
                table: "UserRating",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserRating");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "ab967b03-56b1-40ad-bab6-299baa4c5f9d", "AQAAAAEAACcQAAAAEHNvJWrYjbYU+X1wryLy6SRHIpu2CJLfvE6NP4xdyC11VM6oX5XMnNV+ZGV5k5aa0g==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 10, 27, 304, DateTimeKind.Local).AddTicks(3836));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 10, 27, 304, DateTimeKind.Local).AddTicks(6315));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 10, 27, 304, DateTimeKind.Local).AddTicks(6381));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 10, 27, 304, DateTimeKind.Local).AddTicks(6816));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "DatePosted",
                value: new DateTime(2020, 5, 12, 21, 10, 27, 301, DateTimeKind.Local).AddTicks(9413));
        }
    }
}
