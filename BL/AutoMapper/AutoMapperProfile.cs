using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL;

public class AutoMapperProfile:Profile
{
	public AutoMapperProfile()
	{
		CreateMap<Client, ClientDTO>().ReverseMap();
		CreateMap<Calls, CallsDTO>().ReverseMap();
		CreateMap<Employee, EmployeeDTO>().ReverseMap();
	}
}
