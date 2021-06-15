using System.Collections.Generic;
using Data;
using Entity;
using InfoHomeBackend.InfoHomeApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service;

namespace InfoHomeBackend.InfoHomeApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CasaController : ControllerBase
  {
    private readonly CasaService _casaService;
    public CasaController(InfoHomeContext context)
    {
      _casaService = new CasaService(context);
    }
    // POST: api/Casa
    [HttpPost]
    public ActionResult<CasaViewModel> Post(CasaInputModel casaInputModel)
    {
      Casa casa = MapToCasa(casaInputModel);
      var response = _casaService.Guardar(casa);
      if (response.Error)
      {
        ModelState.AddModelError("Error al registrar la casa", response.Mensaje);
        var detallesProblema = new ValidationProblemDetails(ModelState)
        {
          Status = StatusCodes.Status400BadRequest
        };
        return BadRequest(detallesProblema);
      }
      return Ok(response.Casa);
    }

    private Casa MapToCasa(CasaInputModel casaInputModel)
    {
      var casa = new Casa
      {
        Id = casaInputModel.Id,
        NumeroDeBanos = casaInputModel.NumeroDeBanos,
        NumeroDeCuartos = casaInputModel.NumeroDeCuartos,
        Barrio = casaInputModel.Barrio,
        Direccion = casaInputModel.Direccion,
        Departamento = casaInputModel.Departamento,
        Ciudad = casaInputModel.Ciudad,
        IdUsuario = casaInputModel.IdUsuario,
      };
      return casa;
    }

    // GET: api/AjusteInventario
    [HttpGet]
    public IEnumerable<CasaViewModel> Gets()
    {
      var response = _casaService.ConsultarCasas().ConvertAll(c => new CasaViewModel(c));
      return response;
    }
    [HttpGet("{id}")]
    public ActionResult<CasaViewModel> Get(string id)
    {
      var casa = _casaService.Consultar(id);
      if (casa == null) return NotFound();
      var casaViewModel = new CasaViewModel(casa);
      return casaViewModel;
    }
  }
}