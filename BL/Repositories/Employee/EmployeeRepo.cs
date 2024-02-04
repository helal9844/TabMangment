using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public class EmployeeRepo : GenericRepo<Employee>, IEmployeeRepo
{
    public EmployeeRepo(AppDbContext context) : base(context)
    {
    }
}
