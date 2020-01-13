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
    public class Enlistment
    {
        [Key]
        [DisplayName("Id")]
        [JsonPropertyName("enlistmentId")]
        public int EnlistmentId { get; set; }

        [Required]
        [DisplayName("Joining")]
        [DataType(DataType.Date)]
        [JsonPropertyName("joinDate")]

        public string JoinDate { get; set; }
        [DisplayName("Resigning")]
        [DataType(DataType.Date)]
        [JsonPropertyName("endDate")]

        public string? EndDate { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }

        // [ForeignKey("Employee")]
        // [JsonPropertyName("employeeId")]
        // public  int EmployeeId { get; set; }
        //public virtual  Employee Employee { get; set; }



    }
}
