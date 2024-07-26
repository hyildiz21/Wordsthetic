using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Wordsthetic.DB.Models
{
    [Table("Words")]
    public class Word
    {
        [Key]
        public int WordId { get; set; }
        public string EngText { get; set; }
        public string TrText { get; set; }
    }
}
