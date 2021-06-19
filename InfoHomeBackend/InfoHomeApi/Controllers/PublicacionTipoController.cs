using System.Collections.Generic;
using Data;
using Microsoft.AspNetCore.Mvc;
using Service;
using static InfoHomeBackend.InfoHomeApi.Models.PublicacionModel;

namespace InfoHomeBackend.InfoHomeApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PublicacionTipoController : ControllerBase
  {
    private readonly PublicacionService _publicacionService;
    public PublicacionTipoController(InfoHomeContext context)
    {
      _publicacionService = new PublicacionService(context);
    }
    [HttpGet("{tipo}")]
    public IEnumerable<PublicacionViewModel> Gets(string tipo)
    {
      var response = _publicacionService.ConsultarPorTipo(tipo).ConvertAll(p => new PublicacionViewModel(p));

      return response;
    }
  }
}