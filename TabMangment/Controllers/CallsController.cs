using AutoMapper;
using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TabMangment.Controllers
{

    public class CallsController : BaseContoller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CallsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet("GetCall")]
        public async Task<ActionResult<IEnumerable<Calls>>> GetCallById(int id)
        {
            try
            {
                var call = await _unitOfWork.Calls.GetByIdAsync(id);
                if (call != null)
                    return Ok(call);
                return NotFound();
            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Calls>>> GetCalls()
        {
            try
            {
                var call = await _unitOfWork.Calls.GetAllAsunc();
                if (call != null)
                    return Ok(call);
                return NotFound();
            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
        [HttpPost("AddCalls")]
        public ActionResult AddCalls(CallsDTO dto)
        {
            try
            {
                dto.EnterDate = DateTime.Now;
                var map = _mapper.Map<Calls>(dto);
                if (map != null)
                {
                    _unitOfWork.Calls.Add(map);
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
        [HttpPut("UpdateCalls")]
        public ActionResult UpdateCalls(CallsDTO dto)
        {

            try
            {
                if (dto != null)
                {
                    var call = _unitOfWork.Calls.GetById(dto.Id);
                    if (call != null)
                    {
                        dto.LastUpdateDate = DateTime.Now;
                        _mapper.Map(dto, call);
                        _unitOfWork.Calls.Update(call);
                        _unitOfWork.SaveChanges();
                        return Ok(call);
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
        public ActionResult Delete(CallsDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var call = _unitOfWork.Calls.GetById(dto.Id);
                    if (call != null)
                    {
                        _mapper.Map(dto, call);
                        _unitOfWork.Calls.Delete(call);
                        _unitOfWork.SaveChanges();

                        return Ok(call);
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
        [HttpGet("GetCallClientEmployee")]
        public ActionResult<IEnumerable<Calls>> GetCallClientEmployee()
        {
            try
            {
                var call = _unitOfWork.Calls.GetCallsClientEmployee();
                if (call != null)
                    return Ok(call);
                return NotFound();
            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
    }
}
