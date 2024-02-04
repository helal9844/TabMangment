using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public class CallsRepo : GenericRepo<Calls>, ICallsRepo
{
    public CallsRepo(AppDbContext context) : base(context)
    {
    }

    public IEnumerable<Calls> GetCallsClientEmployee()
    {
       return _context.Calls.Include(p => p.Employee).Include(p => p.Client).ToList();
    }
}
