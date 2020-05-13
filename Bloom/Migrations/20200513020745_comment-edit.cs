using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class commentedit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Edited",
                table: "Comment",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "00000000-ffff-ffff-ffff-ffffffffffff",
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "07d7c0ca-edfc-4a69-9680-eeffef4ce3d6", "AQAAAAEAACcQAAAAEFtfzfA36jjmqqM5b3ktHF+A475jwMl0iRz0elMTW9ZFAn6KdX1yYmqfLTnpcG9VdQ==" });

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 1,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 7, 45, 228, DateTimeKind.Local).AddTicks(8471));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 2,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 7, 45, 229, DateTimeKind.Local).AddTicks(878));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 3,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 7, 45, 229, DateTimeKind.Local).AddTicks(950));

            migrationBuilder.UpdateData(
                table: "Brew",
                keyColumn: "Id",
                keyValue: 4,
                column: "BrewDate",
                value: new DateTime(2020, 5, 12, 21, 7, 45, 229, DateTimeKind.Local).AddTicks(1371));

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "DatePosted",
                value: new DateTime(2020, 5, 12, 21, 7, 45, 226, DateTimeKind.Local).AddTicks(4705));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Edited",
                table: "Comment");

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

            migrationBuilder.UpdateData(
                table: "Comment",
                keyColumn: "Id",
                keyValue: 1,
                column: "DatePosted",
                value: new DateTime(2020, 5, 12, 14, 13, 37, 51, DateTimeKind.Local).AddTicks(9738));
        }
    }
}
