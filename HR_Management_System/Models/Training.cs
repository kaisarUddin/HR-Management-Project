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
    public class Training
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        [JsonPropertyName("trainingId")]
        public int TrainingId { get; set; }
        [Required]
        [DisplayName("Title")]
        [DataType(DataType.Text)]
        [JsonPropertyName("trainingTitle")]
        public string TrainingTitle { get; set; }

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

        [DisplayName("Trainee")]
        [ForeignKey("Employee")]
        [JsonPropertyName("employeeId")]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

       
      
        [JsonPropertyName("deptId")]
        public int DeptId { get; set; }

        [ForeignKey("DeptId")]
        public virtual Department Department { get; set; }




    }
}
