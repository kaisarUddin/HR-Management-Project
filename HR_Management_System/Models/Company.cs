using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HR_Management_System.Models
{
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CompanyId { get; set; }

        [DisplayName("Company")]
        [DataType(DataType.Text)]
        public string CompanyName { get; set; }
        [DisplayName("Address")]
        [DataType(DataType.MultilineText)]
        public string CompanyAddress { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
