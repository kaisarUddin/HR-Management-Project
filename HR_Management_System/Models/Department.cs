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
    public class Department
    {
        [Key]
      
        [DisplayName("Id")]
        [JsonPropertyName("deptId")]
        public int DeptId { get; set; }

        [ForeignKey("Manager")]
        public int ManagerId { get; set; }
        public virtual Manager Manager { get; set; }

        [Required]
        [DisplayName("Department")]
        [JsonPropertyName("departmentName")]
        [DataType(DataType.Text)]
        public string  DepartmentName { get; set; }
        public virtual ICollection<Announcement> Announcements { get; set; }

        public virtual ICollection<Employee>Employees { get; set; }
       

    }
}
