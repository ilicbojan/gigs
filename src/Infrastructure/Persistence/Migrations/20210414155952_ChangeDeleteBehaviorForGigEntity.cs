using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Persistence.Migrations
{
    public partial class ChangeDeleteBehaviorForGigEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gigs_Bands_BandId",
                table: "Gigs");

            migrationBuilder.DropForeignKey(
                name: "FK_Gigs_Cafes_CafeId",
                table: "Gigs");

            migrationBuilder.AddForeignKey(
                name: "FK_Gigs_Bands_BandId",
                table: "Gigs",
                column: "BandId",
                principalTable: "Bands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Gigs_Cafes_CafeId",
                table: "Gigs",
                column: "CafeId",
                principalTable: "Cafes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Gigs_Bands_BandId",
                table: "Gigs");

            migrationBuilder.DropForeignKey(
                name: "FK_Gigs_Cafes_CafeId",
                table: "Gigs");

            migrationBuilder.AddForeignKey(
                name: "FK_Gigs_Bands_BandId",
                table: "Gigs",
                column: "BandId",
                principalTable: "Bands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Gigs_Cafes_CafeId",
                table: "Gigs",
                column: "CafeId",
                principalTable: "Cafes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
