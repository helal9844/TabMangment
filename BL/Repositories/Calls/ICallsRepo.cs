using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public interface ICallsRepo:IGenericRepo<Calls>
{
    IEnumerable<Calls> GetCallsClientEmployee();
}
