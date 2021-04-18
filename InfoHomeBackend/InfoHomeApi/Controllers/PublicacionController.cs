using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Data;
using Service;
using static InfoHomeBackend.InfoHomeApi.Models.PublicacionModel;

namespace InfoHomeBackend.InfoHomeApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PublicacionController : ControllerBase
  {
    private readonly PublicacionService _publicacionService;
    public PublicacionController(InfoHomeContext context)
    {
      _publicacionService = new PublicacionService(context);
    }
    // POST: api/Publicacion
    [HttpPost]
    public ActionResult<PublicacionViewModel> Post(PublicacionInputModel publicacionInputModel)
    {
      Publicacion publicacion = MapToPublicacion(publicacionInputModel);
      var response = _publicacionService.Guardar(publicacion);
      if (response.Error)
      {
        ModelState.AddModelError("Error al registrar la publicación", response.Mensaje);
        var detallesProblema = new ValidationProblemDetails(ModelState)
        {
          Status = StatusCodes.Status400BadRequest
        };
        return BadRequest(detallesProblema);
      }
      return Ok(response.Publicacion);
    }

    private Publicacion MapToPublicacion(PublicacionInputModel publicacionInputModel)
    {
      var publicacion = new Publicacion
      {
        Id = publicacionInputModel.Id,
        Titulo = publicacionInputModel.Titulo,
        Detalle = publicacionInputModel.Detalle,
        IdCasa = publicacionInputModel.IdCasa,
        Fecha = publicacionInputModel.Fecha,
        IdUsuario = publicacionInputModel.IdUsuario,
        Imagenes = publicacionInputModel.Imagenes,
        Tipo = publicacionInputModel.Tipo
      };
      return publicacion;
    }

    // GET: api/Publicacion
    [HttpGet]
    public IEnumerable<PublicacionViewModel> Gets()
    {
      var response = _publicacionService.Consultar().ConvertAll(p => new PublicacionViewModel(p));

      return response;
    }
    [HttpGet("{id}")]
    public ActionResult<PublicacionViewModel> Get(string id)
    {
      var publicacion = _publicacionService.Consultar(id);
      if (publicacion == null) return NotFound();
      var publicacionViewModel = new PublicacionViewModel(publicacion);
      return publicacionViewModel;
    }
    [HttpPut("{id}")]
    public ActionResult<string> Put(Publicacion publicacion, string id)
    {
      var publicacionAEditar = _publicacionService.Consultar(id);
      if (publicacionAEditar == null)
      {
        return BadRequest("No se encontró la publicación");
      }
      else
      {
        var mensaje = _publicacionService.Editar(publicacion).Mensaje;
        return Ok(mensaje);
      }
    }
    [HttpDelete("{id}")]
    public ActionResult<string> Delete(string id)
    {
      var publicacionAEliminar = _publicacionService.Consultar(id);
      if (publicacionAEliminar == null)
      {
        return BadRequest("Publicación no econtrada");
      }
      else
      {
        var mensaje = _publicacionService.Eliminar(id).Mensaje;
        return Ok(mensaje);
      }
    }
  }
}