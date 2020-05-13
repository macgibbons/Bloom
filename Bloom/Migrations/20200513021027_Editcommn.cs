using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Capstone.Migrations
{
    public partial class Editcommn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                columns: new[] { "DatePosted", "Edited" },
                values: new object[] { new DateTime(2020, 5, 12, 21, 10, 27, 301, DateTimeKind.Local).AddTicks(9413), true });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                columns: new[] { "DatePosted", "Edited" },
                values: new object[] { new DateTime(2020, 5, 12, 21, 7, 45, 226, DateTimeKind.Local).AddTicks(4705), false });
        }
    }
}
