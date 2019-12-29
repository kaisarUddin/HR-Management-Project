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
    public class Manager
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Id")]
        [JsonPropertyName("managerId")]
        public int ManagerId { get; set; }

        [DisplayName("Manager")]
        [DataType(DataType.Text)]
        [JsonPropertyName("managerName")]
        public string ManagerName { get; set; }

        public virtual ICollection<Department> Departments { get; set; }


    }
}
