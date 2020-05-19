using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class follows : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Follow",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: true),
                    FolllowId = table.Column<string>(nullable: true),
                    FollowUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Follow", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Follow_AspNetUsers_FollowUserId",
                        column: x => x.FollowUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Follow_AspNetUsers_UserId",
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
                values: new object[] { "a1cdf4a5-2035-48a7-a077-aeba2bac08d5", "AQAAAAEAACcQAAAAEDsND5P6faIjoePHuob98kDRIvCz4v2RZ8RDCx94oRrYeAidxUCtyjRO42fPBFSIvw==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 19, 14, 21, 22, 821, DateTimeKind.Local).AddTicks(1101));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 19, 14, 21, 22, 821, DateTimeKind.Local).AddTicks(4014));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 19, 14, 21, 22, 821, DateTimeKind.Local).AddTicks(4085));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 19, 14, 21, 22, 821, DateTimeKind.Local).AddTicks(4606));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "DatePosted",
                value: new DateTime(2020, 5, 19, 14, 21, 22, 818, DateTimeKind.Local).AddTicks(2030));

            migrationBuilder.InsertData(
                table: "Follow",
                columns: new[] { "Id", "FolllowId", "FollowUserId", "UserId" },
                values: new object[] { 1, "95ef9434-a97b-4e76-a712-74166f685965", null, "00000000-ffff-ffff-ffff-ffffffffffff" });

            migrationBuilder.CreateIndex(
                name: "IX_Follow_FollowUserId",
                table: "Follow",
                column: "FollowUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Follow_UserId",
                table: "Follow",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Follow");

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
        }
    }
}
