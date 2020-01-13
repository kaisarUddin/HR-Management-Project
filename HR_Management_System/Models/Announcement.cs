using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace HR_Management_System.Models
{
    public class Announcement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("announcementId")]
       public int AnnouncementId { get; set; }
        [JsonPropertyName("title")]

        public string Title { get; set; }

        [JsonPropertyName("postedDate")]
       [DataType(DataType.Date)]
        public string PostedDate { get; set; }

        [JsonPropertyName("deptId")]
       [ForeignKey("Department")] 
       
        public int? DeptId { get; set; }
        public virtual Department Department { get; set; }
        [JsonPropertyName("description")]

        public string Description { get; set; }
    }
}
