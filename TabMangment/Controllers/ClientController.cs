using AutoMapper;
using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace TabMangment.Controllers
{

    public class ClientController : BaseContoller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public ClientController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        [HttpGet("GetClinet")]
        public async Task<ActionResult<IEnumerable<Client>>> GetClinetById(int id)
        {
            try
            {
                var client = await _unitOfWork.Clients.GetByIdAsync(id);
                if (client != null)
                    return Ok(client);
                return NotFound();
            }
            catch
            {
                return  StatusCode(500,"Internal Erorr");
            }
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            try
            {
                var clients = await _unitOfWork.Clients.GetAllAsunc();
                if (clients != null)
                    return Ok(clients);
                return NotFound();
            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
        [HttpPost("AddClient")]
        public ActionResult AddClient(ClientDTO dto)
        {
            try
            {
                dto.EnterDate = DateTime.Now;
                var map = _mapper.Map<Client>(dto);
                if(map != null)
                {
                    _unitOfWork.Clients.Add(map);
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
        [HttpPut("UpdateClient")]
        public ActionResult UpdateClient(ClientDTO dto)
        {

            try
            {
                if (dto!= null)
                {
                    var client = _unitOfWork.Clients.GetById(dto.Id);
                    if (client != null)
                    {
                        dto.LastUpdateDate = DateTime.Now;
                        _mapper.Map(dto, client);
                        _unitOfWork.Clients.Update(client);
                        _unitOfWork.SaveChanges();
                        return Ok(client);
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
        public ActionResult Delete(ClientDTO dto)
        {
            try
            {
                if (dto != null)
                {
                    var client = _unitOfWork.Clients.GetById(dto.Id);
                    if (client != null)
                    {
                        _mapper.Map(dto, client);
                        _unitOfWork.Clients.Delete(client);
                        _unitOfWork.SaveChanges();
                        
                        return Ok(client);
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
        [HttpGet("GetClinetwithEmployee")]
        public ActionResult<IEnumerable<Client>> GetClinetwithEmployee()
        {
            try
            {
                var clients = _unitOfWork.Clients.GetClientsWithEmployee();
                if (clients != null)
                    return Ok(clients);
                return NotFound();
            }
            catch
            {
                return StatusCode(500, "Internal Erorr");
            }
        }
    }
}
