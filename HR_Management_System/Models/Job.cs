using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("jobId")]
        public int JobId { get; set; }
        [JsonPropertyName("jobTitle")]

        public string JobTitle { get; set; }

        [DataType(DataType.Currency)]
        [JsonPropertyName("minSalary")]

        public decimal MinSalary { get; set; }
        [DataType(DataType.Currency)]
        [JsonPropertyName("maxSalary")]

        public decimal MaxSalary { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<Interview> Interviews { get; set; }

    }
}
