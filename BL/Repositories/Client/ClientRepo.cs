using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public class ClientRepo : GenericRepo<Client>, IClientRepo
{
    public ClientRepo(AppDbContext context) : base(context)
    {
    }

    public IEnumerable<Client> GetClientsWithEmployee()
    {
        return _context.Clients.Include(c=>c.SalesMan).ToList(); 
    }
}
