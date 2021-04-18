using System.Collections.Generic;
using Data;
using InfoHomeBackend.InfoHomeApi.Models;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace InfoHomeBackend.InfoHomeApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CasaUsuarioController : ControllerBase
  {
    private readonly CasaService _casaService;
    public CasaUsuarioController(InfoHomeContext context)
    {
      _casaService = new CasaService(context);
    }
    [HttpGet("{id}")]
    public IEnumerable<CasaViewModel> Gets(string id)
    {
      var response = _casaService.ConsultarCasasUsuario(id).ConvertAll(c => new CasaViewModel(c));
      return response;
    }
  }
}