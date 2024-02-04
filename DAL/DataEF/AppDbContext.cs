using BL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    public DbSet<Calls> Calls { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Client> Clients { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>()
            .Property(e => e.JobType)
            .HasConversion<int>();

        modelBuilder.Entity<Calls>()
            .HasOne(c => c.Employee)
            .WithMany(e => e.CallsMade)
            .HasForeignKey(c => c.EmployeeId).OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Calls>()
            .HasOne(c => c.Client)
            .WithMany(cl => cl.Calls)
            .HasForeignKey(c => c.ClientId).OnDelete(DeleteBehavior.Cascade);
        base.OnModelCreating(modelBuilder);
    }
}
