using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Expenses
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ExpensesId { get; set; }
        public string Title { get; set; }

        [DataType(DataType.Date)]
        public string PurchaseDate { get; set; }
        public string PurchaseBy { get; set; }

        [DisplayName("Bill")]
        [DataType(DataType.ImageUrl)]
        [ScaffoldColumn(false)]
        public string Bill { get; set; }


        [NotMapped]
        public IFormFile Upload { get; set; }

    }
}
