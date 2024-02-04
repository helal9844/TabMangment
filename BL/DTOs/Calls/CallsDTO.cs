using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public class CallsDTO
{
    public int Id { get; set; }
    [Required]
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public string Project { get; set; }
    [Required]
    public string CallType { get; set; }
    public string EnterBy { get; set; }
    public DateTime EnterDate { get; set; }
    public string LastUpdateBy { get; set; }
    public DateTime LastUpdateDate { get; set; }

    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }

    [ForeignKey("Client")]
    public int ClientId { get; set; }
}
