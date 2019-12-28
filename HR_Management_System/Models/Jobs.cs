using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Jobs
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int JobsId { get; set; }
        public string JobTitle { get; set; }
        [DataType(DataType.Currency)]
        public decimal MinSalary { get; set; }
        [DataType(DataType.Currency)]
        public decimal MaxSalary { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }

    }
}
