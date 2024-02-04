using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BL;

public class Client:MainProps
{
    public int Id { get; set; }
    [Required]
    public string ClientName { get; set; }
    [Required]
    public string ClientJob { get; set; }
    

    [ForeignKey("SalesMan")]
    public int SalesManId { get; set; }
    public Employee SalesMan { get; set; }
    [JsonIgnore]
    public ICollection<Calls> Calls { get; set; }

}
