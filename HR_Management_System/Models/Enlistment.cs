using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Enlistment
    {
        [Key]
    
        [DisplayName("Id")]
        public int EnlistmentId { get; set; }
        [Required]
        [DisplayName("Joinging")]
        [DataType(DataType.Date)]

        public string JoinDate { get; set; }
        [DisplayName("Resigning")]
        [DataType(DataType.Date)]

        public string EndDate { get; set; }

       
        public virtual ICollection<Employee> Employees { get; set; }

    }
}
