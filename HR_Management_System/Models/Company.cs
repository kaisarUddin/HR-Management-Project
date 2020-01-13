using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace HR_Management_System.Models
{
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("companyId")]
        public int CompanyId { get; set; }

        [DisplayName("Company")]
        [DataType(DataType.Text)]
        [JsonPropertyName("companyName")]

        public string CompanyName { get; set; }
        [JsonPropertyName("companyAddress")]
        [DisplayName("Address")]
        [DataType(DataType.MultilineText)]
        public string CompanyAddress { get; set; }
     
        public virtual ICollection<Interview> Interviews { get; set; }
        public virtual ICollection<Department> Departments { get; set; }
    }
}
