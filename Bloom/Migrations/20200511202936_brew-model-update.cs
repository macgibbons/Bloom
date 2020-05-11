using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class brewmodelupdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Shared",
                table: "Brew",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Shared",
                table: "Brew");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e9539bbd-53d3-470c-b066-27c9c332833e", "AQAAAAEAACcQAAAAELfwSDqmzs6RRFkkHLEvDMHTgIzdm0VNfdHSUEk0DcQ4KlhtD4ZSyFnSeYzpCV1utg==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 10, 47, 38, 384, DateTimeKind.Local).AddTicks(5908));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 10, 47, 38, 386, DateTimeKind.Local).AddTicks(7233));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 10, 47, 38, 386, DateTimeKind.Local).AddTicks(7313));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 11, 10, 47, 38, 386, DateTimeKind.Local).AddTicks(7779));
        }
    }
}
