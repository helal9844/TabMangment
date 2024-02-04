using AutoMapper;
using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TabMangment.Controllers
{

    public class EmployeeController : BaseContoller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EmployeeController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet("GetEmployee")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeById(int id)
        {
            try
            {
                var emp = await _unitOfWork.Employees.GetByIdAsync(id);
                if (emp != null)
                    return Ok(emp);
                return NotFound();
            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            try
            {
                var emp = await _unitOfWork.Employees.GetAllAsunc();
                if (emp != null)
                    return Ok(emp);
                return NotFound();
            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
        [HttpPost("AddEmployee")]
        public ActionResult AddEmployee(EmployeeDTO dto)
        {
            try
            {
                dto.EnterDate = DateTime.Now;
                var map = _mapper.Map<Employee>(dto);
                if (map != null)
                {
                    _unitOfWork.Employees.Add(map);
                    _unitOfWork.SaveChanges();
                    return Ok(map);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
        [HttpPut("UpdateEmployee")]
        public ActionResult UpdateEmployee(EmployeeDTO dto)
        {

            try
            {
                if (dto != null)
                {
                    var emp = _unitOfWork.Employees.GetById(dto.Id);
                    if (emp != null)
                    {
                        dto.LastUpdateDate = DateTime.Now;
                        _mapper.Map(dto, emp);
                        _unitOfWork.Employees.Update(emp);
                        _unitOfWork.SaveChanges();
                        return Ok(emp);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return BadRequest();
                }

            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
        [HttpDelete("Delete")]
        public ActionResult Delete(EmployeeDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var emp = _unitOfWork.Employees.GetById(dto.Id);
                    if (emp != null)
                    {
                        _mapper.Map(dto, emp);
                        _unitOfWork.Employees.Delete(emp);
                        _unitOfWork.SaveChanges();

                        return Ok(emp);
                    }
                    return NotFound();
                }
                return BadRequest();
            }
            catch
            {
                return StatusCode(500, "Internal Error");

            }

        }
    }
}
