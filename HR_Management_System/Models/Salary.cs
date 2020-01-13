using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using AutoMapper;

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
        [DisplayName("Employee")]
        [JsonPropertyName("employeeId")]
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
       
        public int PolicyId { get; set; }

     




        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [DisplayName("T/A")]
        [JsonPropertyName("transportAllowance")]
        public decimal TransportAllowance
        {
            get
             {
                if (PayrollPolicy!=null)
                {
                   return Basic* PayrollPolicy.TA  / 100M;
                }
                return 0;
            }

        }

        [DisplayName("H/R")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("houseRent")]
        public decimal HouseRent
        {
            get
            {
                if (PayrollPolicy != null)
                {
                    return Basic * PayrollPolicy.HR / 100M;
                }
                return 0;
            }

        }
        [DisplayName("M/A")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("medicalAllowance")]
        public decimal MedicalAllowance
        {
            get
            {
                if (PayrollPolicy != null)
                {
                    return Basic * PayrollPolicy.MA / 100M;
                }
                return 0;
            }

        }

        [DisplayName("F/A")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("foodAllowance")]
        public decimal FoodAllowance
        {
            get
            {
                if (PayrollPolicy != null)
                {
                    return Basic * PayrollPolicy.FA / 100M;
                }
                return 0;
            }

        }

       

        [DataType(DataType.Currency)]
        [DisplayName("Festival Bonus")]
        [JsonPropertyName("festivalBonus")]
        public decimal FestivalBonus
        {
            get
            {
                if (PayrollPolicy != null)
                {
                    return Basic * PayrollPolicy.FB / 100M;
                }
                return 0;
            }
        }

        [DisplayName("P/F")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("providentFund")]
        public decimal ProvidentFund
        {
            get
            {
                if (PayrollPolicy != null)
                {
                    return Basic * PayrollPolicy.PF / 100M;
                }
                return 0;
            }

        }

        [JsonPropertyName("overTime")]
        [DisplayName("Over Time")]
        public int OverTime { get; set; }
        [JsonPropertyName("oTRate")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal OTRate
        {
            get { return OverTime * 500; }

        }

        [ForeignKey("Leave")]
        [JsonPropertyName("leaveId")]
        public int LeaveId { get; set; }
        public virtual Leave Leave { get; set; }

      
        [JsonPropertyName("leaveFine")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal LeaveFine
        {
            get
            {
                if (Leave != null)
                {
                    return Leave.TotalLeave * 1000;
                }
                return 0;
            }

        }


        [DisplayName("Gross")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [JsonPropertyName("grossSalary")]
        public decimal GrossSalary
        {
            get
            {
                return Basic + TransportAllowance + FestivalBonus + HouseRent + MedicalAllowance+FoodAllowance+ OTRate - ProvidentFund- LeaveFine;
            }

        }
        [ForeignKey("PolicyId")]
        public virtual PayrollPolicy PayrollPolicy { get; set; }
    }
}
