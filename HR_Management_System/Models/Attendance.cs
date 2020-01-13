using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HR_Management_System.Models
{
    public class Attendance
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("attendanceId")]
        public int AttendanceId { get; set; }
       [ForeignKey("Employee")]
       [JsonPropertyName("employeeId")]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }
      
        [Required]
        [DataType(DataType.Time)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:HH:mm}")]
        [JsonPropertyName("punchIn")]
        public string PunchIn { get; set; }

        [Required]
        [DataType(DataType.Time)]
        [JsonPropertyName("punchOut")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:HH:mm}")]
        public string PunchOut { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [JsonPropertyName("date")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy-MM-dd}")]
        public string Date { get; set; }

        [Required]
        [JsonPropertyName("active")]
        public Boolean Active { get; set; }
    }
}
