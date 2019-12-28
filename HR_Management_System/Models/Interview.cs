using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Interview
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int InterviewId { get; set; }

        [DataType(DataType.DateTime)]
        public string InterviewTime{ get; set; }
        public string JobId { get; set; }
        public string CandidateName { get; set; }
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }
        public string Interviewer { get; set; }

        public string Remarks { get; set; }


    }
}
