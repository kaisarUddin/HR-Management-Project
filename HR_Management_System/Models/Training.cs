using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Training
    {
        [Key]

        [DisplayName("Id")]
        public int TrainingId { get; set; }
        [Required]
        [DisplayName("Title")]
        [DataType(DataType.Text)]
        public string TrainingTitle { get; set; }
        [Required]
        [DisplayName("Start Date")]
        [DataType(DataType.Date)]
        public string StartDate { get; set; }
        [Required]
        [DisplayName("End Date")]

        [DataType(DataType.Date)]
        public string EndDate { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

       
    }
}
