using BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BL;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        Employees = new EmployeeRepo(_context);
        Clients = new ClientRepo(_context);
        Calls = new CallsRepo(_context);
    }

    public IEmployeeRepo Employees {get; set;}

    public IClientRepo Clients { get; set; }

    public ICallsRepo Calls { get; set; }

    public void Dispose()
    {
       _context.Dispose();
    }

    public void SaveChanges()
    {
       _context.SaveChanges();
    }

    public async Task SaveChangesAsync()
    {
      await _context.SaveChangesAsync();
    }
}
