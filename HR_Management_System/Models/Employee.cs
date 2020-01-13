using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Employee
    {

        #region Properties
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        [JsonPropertyName("employeeId")]
        public int EmployeeId { get; set; }
        [Required]
        [DisplayName("First Name")]
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }
        [Required]
        [DisplayName("Last Name")]
        [JsonPropertyName("lastName")]
        public string LastName { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [DisplayName("Full Name")]
        [JsonPropertyName("fullName")]
        public string FullName => FirstName + ' ' + LastName;

        [Required]
        [DisplayName("Gender")]
        [JsonPropertyName("gender")]
        public string Gender { get; set; }
        [Required]
        [DisplayName("Address")]
        [DataType(DataType.MultilineText)]
        [StringLength(250)]
        [JsonPropertyName("address")]
        public string Address { get; set; }
        [Required]
        [DisplayName("Blood Group")]
        [JsonPropertyName("bloodGroup")]
        public string BloodGroup { get; set; }

        [Required]
        [DisplayName("Marital Status")]
        [JsonPropertyName("maritalStatus")]
        public string MaritalStatus { get; set; }
       
        [Required]
        [StringLength(15)]
        [DataType(DataType.PhoneNumber)]
        [DisplayName("Mobile")]
        [JsonPropertyName("mobileNo")]
        public string MobileNo { get; set; }
        //[DataType(DataType.EmailAddress)]
        [EmailAddress]
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [DisplayName("Photo")]
        //[DataType(DataType.ImageUrl)]
        [ScaffoldColumn(false)]
        [JsonPropertyName("profilePicture")]
        public string ProfilePicture{ get; set; }

        
        [NotMapped]
        public IFormFile Upload { get; set; }

        #endregion


        #region ForeignKeys
        [ForeignKey("Department")]
        [JsonPropertyName("deptId")]
        public int DeptId { get; set; }
        public virtual Department Department { get; set; }
        [ForeignKey("Enlistment")]
        [JsonPropertyName("enlistmentId")]
        public int EnlistmentId { get; set; }
        public virtual Enlistment Enlistment { get; set; }


        [ForeignKey("Jobs")]
        [JsonPropertyName("jobId")]
        public int JobId { get; set; }
        public virtual Job Jobs { get; set; }
        [ForeignKey("Designation")]
        [JsonPropertyName("desigId")]
        public int DesigId { get; set; }
        public virtual Designation Designation { get; set; }



        [ForeignKey("Shift")]
        [JsonPropertyName("shiftId")]
        public int ShiftId { get; set; }
        public virtual Shift Shift { get; set; }


       



        public virtual ICollection<Training>  Trainings { get; set; }
        public virtual ICollection<Attendance> Attendances { get; set; }
        public virtual ICollection<Leave> Leaves { get; set; }
        public virtual ICollection<Remarks> Remarks { get; set; }
        public virtual ICollection<Salary> Salaries { get; set; }
        
       

        #endregion
    }
  
}
