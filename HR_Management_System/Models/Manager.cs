using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Manager
    {
        [Key]

        [DisplayName("Id")]

        public int ManagerId { get; set; }
       //// [ForeignKey("Employee")]
       //// public int EmployeeId { get; set; }
       // public virtual Employee Employee { get; set; }
        [Required]
        [DisplayName("Manager")]
        [DataType(DataType.Text)]
        public string ManagerName { get; set; }

        public virtual ICollection<Department> Departments { get; set; }


    }
}
