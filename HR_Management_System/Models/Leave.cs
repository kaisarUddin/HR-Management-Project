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
    //public enum LeaveType { Medical, Casual, Maternity,Paternity,Special}
    public class Leave
    {
        [Key]
       [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        [JsonPropertyName("leaveId")]
        public int LeaveId { get; set; }
        [Required]
        [DisplayName("Category")]
        [DataType(DataType.Text)]
        [JsonPropertyName("leaveCategory")]
        public string LeaveCategory { get; set; }
        [Required]
        [DisplayName("Start Date")]
        [DataType(DataType.Date)]
        [JsonPropertyName("startDate")]
        public string StartDate { get; set; }
        [Required]
        [DisplayName("End Date")]
        [DataType(DataType.Date)]
        [JsonPropertyName("endDate")]
        public string EndDate { get; set; }

        [DisplayName("TotalLeave")]
        [JsonPropertyName("totalLeave")]
        public byte TotalLeave { get; set; }
        [JsonPropertyName("approvalStatus")]
        public string ApprovalStatus { get; set; }

        [JsonPropertyName("employeeId")]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

       
    }
}
