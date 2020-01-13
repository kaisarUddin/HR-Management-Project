using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HR_Management_System.Migrations
{
    public partial class DBMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_Departments_DepartmentDeptId",
                table: "Interviews");

            migrationBuilder.DropIndex(
                name: "IX_Interviews_DepartmentDeptId",
                table: "Interviews");

            migrationBuilder.DropColumn(
                name: "DepartmentDeptId",
                table: "Interviews");

            migrationBuilder.AddColumn<int>(
                name: "OverTime",
                table: "PayrollPolicy",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "InterviewDate",
                table: "Interviews",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OverTime",
                table: "PayrollPolicy");

            migrationBuilder.AlterColumn<string>(
                name: "InterviewDate",
                table: "Interviews",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(DateTime));

            migrationBuilder.AddColumn<int>(
                name: "DepartmentDeptId",
                table: "Interviews",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_DepartmentDeptId",
                table: "Interviews",
                column: "DepartmentDeptId");

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_Departments_DepartmentDeptId",
                table: "Interviews",
                column: "DepartmentDeptId",
                principalTable: "Departments",
                principalColumn: "DeptId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
