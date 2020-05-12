using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class comment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "592a0eea-fd5a-44d1-b01a-20c30cff666d", "AQAAAAEAACcQAAAAEPOdYc7CuwBXHfyM8emdMZYlMVTYLEwXZx1p/QUSg8KrRuAR/00UiLVAPZCcgsT5FA==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 15, 29, 35, 937, DateTimeKind.Local).AddTicks(5065));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 15, 29, 35, 939, DateTimeKind.Local).AddTicks(6721));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 15, 29, 35, 939, DateTimeKind.Local).AddTicks(6803));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 15, 29, 35, 939, DateTimeKind.Local).AddTicks(7406));
        }
    }
}
