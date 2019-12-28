using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
   // public enum Type { Monthly, Yearly }
    public class Salary
    {
        [Key]
        [DisplayName("Id")]
        [JsonPropertyName("salaryId")]
        public int SalaryId { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Basic")]
        [JsonPropertyName("Employee Id")]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public virtual Employee Employees { get; set; }
        [JsonPropertyName("basic")]
        public decimal Basic { get; set; }


        [JsonPropertyName("salaryType")]
        [DisplayName("Salary Type")]
        public string SalaryType { get; set; }

        [JsonPropertyName("policyId")]
        [DisplayName("Policy Id")]
        [ForeignKey("PayrollPolicy")]
        public int PolicyId { get; set; }

        public virtual PayrollPolicy PayrollPolicy { get; set; }




        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [DisplayName("T/A")]
        [JsonPropertyName("transportAllowance")]
        public decimal TransportAllowance
        {
            get
            {
                return Basic * PayrollPolicy.MA / 100M;
            }

        }

        [DisplayName("H/R")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("houseRent")]
        public decimal HouseRent
        {
            get
            {
                return Basic * PayrollPolicy.HR / 100M;
            }

        }
        [DisplayName("M/A")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("medicalAllowance")]
        public decimal MedicalAllowance
        {
            get
            {
                return Basic * PayrollPolicy.MA / 100M;
            }

        }

        [DisplayName("F/A")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("foodAllowance")]
        public decimal FoodAllowance
        {
            get
            {
                return Basic * PayrollPolicy.FA / 100M;
            }

        }

       

        [DataType(DataType.Currency)]
        [DisplayName("Festival Bonus")]
        [JsonPropertyName("festivalBonus")]
        public decimal FestivalBonus
        {
            get
            {
                return Basic * PayrollPolicy.FB / 100M;
            }
        }

        [DisplayName("P/F")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("providentFund")]
        public decimal ProvidentFund
        {
            get
            {
                return Basic * PayrollPolicy.PF;
            }

        }


        [DisplayName("Gross")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("grossSalary")]
        public decimal GrossSalary
        {
            get
            {
                return Basic + TransportAllowance + FestivalBonus + HouseRent + MedicalAllowance+FoodAllowance-ProvidentFund;
            }

        }
    


      

    }
}
