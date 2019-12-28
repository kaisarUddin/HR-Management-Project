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
    public class Designation
    {
        [Key]
 
        [DisplayName("Id")]
        [JsonPropertyName("desigId")]
        public int DesigId { get; set; }
        [Required]
        [DisplayName("Designation")]
        [DataType(DataType.Text)]
        [JsonPropertyName("designationName")]

        public string DesignationName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
