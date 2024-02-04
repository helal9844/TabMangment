using BL;
using DAL;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace TabMangment
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region DefaultService
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            #endregion

            #region DataBase
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<AppDbContext>(option => option.UseSqlServer(connectionString));
            #endregion

            #region AutoMapper
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
            #endregion

            #region Repositories
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            #region Cores
            builder.Services.AddCors(p => p.AddPolicy("coresapp", builder =>
            {
                builder.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:4200");
            }));
            #endregion

            var app = builder.Build();

            #region MiddleWares
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("coresapp");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
            #endregion
        }
    }
}