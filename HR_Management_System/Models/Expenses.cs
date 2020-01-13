using Microsoft.AspNetCore.Http;
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
    public class Expenses
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("expensesId")]
        public int ExpensesId { get; set; }
        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("purchaseDate")]

        [DataType(DataType.Date)]
        public string PurchaseDate { get; set; }

        [JsonPropertyName("purchaseBy")]

        public string PurchaseBy { get; set; }
      

        [DisplayName("Bill")]
        [DataType(DataType.ImageUrl)]
        [ScaffoldColumn(false)]
        [JsonPropertyName("bill")]

        public string Bill { get; set; }


        [NotMapped]
        public IFormFile Upload { get; set; }

        
        [JsonPropertyName("deptId")]
        public int DeptId { get; set; }

        [ForeignKey("DeptId")]
        public  virtual Department Department { get; set; }

       

    }
}
