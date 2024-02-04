using BL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BL;

public class Employee:MainProps
{
    public int Id { get; set; }
    [Required]
    public string EmployeeName { get; set; }
    [Required]
    public JobType JobType { get; set; }

    [JsonIgnore]
    public ICollection<Calls> CallsMade { get; set; }
}
