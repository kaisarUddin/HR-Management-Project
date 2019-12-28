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
    // public enum ShiftType {Morning,Evening,Night  }

    public class Shift
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        [JsonPropertyName("shiftId")]
        public int ShiftId { get; set; }

        [Required]
        [DisplayName("Shift")]
        [JsonPropertyName("shiftName")]
        public string ShiftName { get; set; }

        [Required]
        [DisplayName("Start Time")]
        [JsonPropertyName("startTime")]
        [DataType(DataType.Time)]

        public string StartTime { get; set; }
        [Required]
        [DisplayName("End Time")]
        [JsonPropertyName("endTime")]
        [DataType(DataType.Time)]
        public string EndTime { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }

    }
}
