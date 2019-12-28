using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Employee
    {

        #region Properties
        [Key]

        [DisplayName("Id")]
        public int EmployeeId { get; set; }
        [Required]
        [DisplayName("First Name")]
        public string FirstName { get; set; }
        [Required]
        [DisplayName("Last Name")]
        public string LastName { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [DisplayName("Full Name")]
        public string FullName => FirstName + ' ' + LastName;

        [Required]
        [DisplayName("Gender")]
        public Gender Gender { get; set; }
        [Required]
        [DisplayName("Address")]
        [DataType(DataType.MultilineText)]
        [StringLength(250)]
        public string Address { get; set; }
        [Required]
        [DisplayName("Blood Group")]
        public string BloodGroup { get; set; }

        [Required]
        [DisplayName("Marital Status")]
        public MaritalStatus MaritalStatus { get; set; }
       
        [Required]
        [StringLength(15)]
        [DataType(DataType.PhoneNumber)]
        [DisplayName("Mobile")]
        public string MobileNo { get; set; }
        //[DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [DisplayName("Photo")]
        [DataType(DataType.ImageUrl)]
        [ScaffoldColumn(false)]
        public string ProfilePicture{ get; set; }

        
        [NotMapped]
        public IFormFile Upload { get; set; }

        #endregion


        #region ForeignKeys
        [ForeignKey("Department")]
        public int DeptId { get; set; }
        public virtual Department Department { get; set; }

        [ForeignKey("Company")]
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }

        [ForeignKey("Jobs")]
        public int JobId { get; set; }
        public virtual Jobs Jobs { get; set; }
        [ForeignKey("Designation")]
        public int DesigId { get; set; }
        public virtual Designation Designation { get; set; }


        [ForeignKey("Enlistment")]
        public int EnlistmentId { get; set; }
        public virtual Enlistment Enlistment { get; set; }

        [ForeignKey("Shift")]
        public int ShiftId { get; set; }
        public virtual Shift Shift { get; set; }


       



        public virtual ICollection<Training>  Trainings { get; set; }
        //public virtual ICollection<Manager>  Managers { get; set; }
        //public virtual ICollection<Department> Departments { get; set; }
        public virtual ICollection<Attendance> Attendances { get; set; }
        public virtual ICollection<Leave> Leaves { get; set; }
        public virtual ICollection<Remarks> Remarks { get; set; }
        public virtual ICollection<Salary> Salaries { get; set; }






        #endregion
    }
    public enum Gender { Male, Female }
    public enum MaritalStatus { Single, Married, Divorced }
}
