using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Holidays
    {
        [Key]

        [DisplayName("Id")]
        public int HolidayId { get; set; }
        [Required]
        [DisplayName("Name")]
        public string Name { get; set; }
        [Required]
        [DisplayName("Date")]
        [DataType(DataType.Date)]
        public string Date { get; set; }
        [Required]
        [DisplayName("Details")]
        public string Description { get; set; }
    }
}
