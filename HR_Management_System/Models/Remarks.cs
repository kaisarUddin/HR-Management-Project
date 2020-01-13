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
    public class Remarks
    {
        [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        [JsonPropertyName("remarkId")]
        public int RemarkId { get; set; }
        [Required]
        [DisplayName("Remarks")]
        [DataType(DataType.MultilineText)]
        [JsonPropertyName("comments")]
        public string Comments { get; set; }
       

        [ForeignKey("Employee")]
        [JsonPropertyName("employeeId")]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

       
        [JsonPropertyName("managerId")]
        public int ManagerId { get; set; }
        [ForeignKey("ManagerId")]
        public virtual Manager Manager { get; set; }


    }
}
