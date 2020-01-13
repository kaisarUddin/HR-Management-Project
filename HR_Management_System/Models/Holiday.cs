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
    public class Holiday
    {
        [Key]

        [DisplayName("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("holidayId")]
        public int HolidayId { get; set; }
        [Required]
        [DisplayName("Name")]
        [JsonPropertyName("name")]

        public string Name { get; set; }
        [Required]
        [DisplayName("Date")]
        [DataType(DataType.Date)]
        [JsonPropertyName("date")]

        public string Date { get; set; }
        [Required]
        [DisplayName("Details")]
        [JsonPropertyName("description")]

        public string Description { get; set; }
        [JsonPropertyName("deptId")]
        public int DeptId { get; set; }

        [ForeignKey("DeptId")]
        public virtual Department Department { get; set; }

    }
}
