using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace HR_Management_System.Models
{
    public class PayrollPolicy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("policyId")]
        public int PolicyId { get; set; }

        [DisplayName("Policy Category")]
        [JsonPropertyName("policyType")]
        public string PolicyType { get; set; }
        //public string Remarks { get; set; }

        [DisplayName("Transport Allowance")]
        [JsonPropertyName("tA")]
        public decimal TA { get; set; }
        [DisplayName("House Rent")]
        [JsonPropertyName("hR")]
        public decimal HR { get; set; }
        [DisplayName("Medical Allowance")]
        [JsonPropertyName("mA")]
        public decimal MA { get; set; }
        [DisplayName("Food Allowance")]
        [JsonPropertyName("fA")]
        public decimal FA { get; set; }

        [DisplayName("Festival Bonus")]
        [JsonPropertyName("fB")]
        public decimal FB { get; set; }

        [DisplayName("Provident Fund")]
        [JsonPropertyName("pF")]
        public decimal PF { get; set; }
        [JsonPropertyName("overTime")]
        public int OverTime { get; set; }

      

        public virtual ICollection<Salary> Salaries { get; set; }
    }
}