using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Remarks
    {
        [Key]
      
        [DisplayName("Id")]
        public int RemarkId { get; set; }
        [Required]
        [DisplayName("Remarks")]
        [DataType(DataType.MultilineText)]
        public string Comments { get; set; }
        [Required]
        [DisplayName("Remarks By")]
        [DataType(DataType.Text)]
        public string RemarksBy { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public virtual Employee Employee { get; set; }

      
    }
}
