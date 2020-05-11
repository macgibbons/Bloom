using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class imagePath : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImagePath",
                table: "BrewMethod",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImagePath",
                table: "BrewMethod");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "e4e5f374-2903-46b0-9158-d1aae9355ecb", "AQAAAAEAACcQAAAAELOXvEU11+GMeN3ortcbffV5C1VCozX0I2GM1JDZlUk68RFpMQxQWBCn2w5uXeRJ3w==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 4, 10, 57, 46, 395, DateTimeKind.Local).AddTicks(2242));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(5955));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(6045));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 4, 10, 57, 46, 397, DateTimeKind.Local).AddTicks(6510));
        }
    }
}
