using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Interview
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("interviewId")]
        public int InterviewId { get; set; }

        //[DataType(DataType.DateTime)]
        [JsonPropertyName("interviewDate")]
        public DateTime InterviewDate { get; set; }



        [JsonPropertyName("candidateName")]
        public string CandidateName { get; set; }




        [DataType(DataType.PhoneNumber)]
       [JsonPropertyName("phone")]
        public string Phone { get; set; }



        [JsonPropertyName("interviewer")]
        public string Interviewer { get; set; }

        [JsonPropertyName("remarks")]
        public string Remarks { get; set; }

       


        [ForeignKey("Job")]
        [JsonPropertyName("jobId")]
        public int JobId { get; set; }
        public virtual Job Job { get; set; }






        [ForeignKey("CompanyId")]
        [JsonPropertyName("companyId")]
        public int CompanyId { get; set; }

        public virtual Company Company { get; set; }
      

    }
}
