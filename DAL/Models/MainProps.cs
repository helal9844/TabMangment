using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public class MainProps
{
    [StringLength(100)]
    public string Address { get; set; }
    [Phone]
    public string PhoneNumber { get; set; }
    [Phone]
    public string Mobile { get; set; }
    [Phone]
    public string WhatsApp { get; set; }
    [EmailAddress]
    public string Email { get; set; }
    [MaxLength(10)]
    public string Code { get; set; }
    [StringLength(50)]
    public string Nationality { get; set; }
    [StringLength(50)]
    public string Residence { get; set; }
    public string EnterBy { get; set; }
    public DateTime EnterDate { get; set; }
    public string LastUpdateBy { get; set; }
    public DateTime LastUpdateDate { get; set; }
}
