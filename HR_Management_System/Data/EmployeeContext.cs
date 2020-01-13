using HR_Management_System.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Data
{
    public class EmployeeContext:DbContext
    {
        public DbSet <Employee> Employees { get; set; }
        public DbSet <Designation> Designations { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<Holiday> Holidays { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Manager> Managers { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet <Department> Departments { get; set; }
        public DbSet <Enlistment> Enlistments { get; set; }
        public DbSet <Leave> Leaves { get; set; }
        public DbSet <Remarks> Remarks { get; set; }
        public DbSet <Salary> Salaries { get; set; }
        public DbSet <Shift> Shifts { get; set; }
        public DbSet <Company>  Companies { get; set; }
        public EmployeeContext(DbContextOptions<EmployeeContext> o) :base(o)
        {


        }
        public DbSet<PayrollPolicy> PayrollPolicy { get; set; }
        public DbSet<Manager> Manager { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            //modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();
            //modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }
    }
}
