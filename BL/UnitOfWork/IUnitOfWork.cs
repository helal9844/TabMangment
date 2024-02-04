using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public interface IUnitOfWork:IDisposable
{
    IEmployeeRepo Employees { get; } 
    IClientRepo Clients { get; }
    ICallsRepo Calls { get; }
    void SaveChanges();
    Task SaveChangesAsync();
}
