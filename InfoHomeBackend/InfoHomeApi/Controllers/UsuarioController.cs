using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Data;
using Service;
using static InfoHomeApi.Models.UsuarioModel;

namespace InfoHomeApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsuarioController : Controller
  {
    private readonly UsuariosService _usuarioService;
    private readonly CasaService _casaService;
    private readonly PublicacionService _publicacionService;
    public UsuarioController(InfoHomeContext context)
    {
      _usuarioService = new UsuariosService(context);
      _casaService = new CasaService(context);
      _publicacionService = new PublicacionService(context);
    }
    // POST: api/Usuario
    [HttpPost]
    public ActionResult<UsuarioViewModel> Post(UsuarioInputModel usuarioInputModel)
    {
      Usuario usuario = MapToUsuario(usuarioInputModel);
      var response = _usuarioService.Guardar(usuario);
      if (response.Error)
      {
        ModelState.AddModelError("Error al registrar el usuario", response.Mensaje);
        var detallesProblema = new ValidationProblemDetails(ModelState)
        {
          Status = StatusCodes.Status400BadRequest
        };
        return BadRequest(detallesProblema);
      }
      return Ok(response.Usuario);
    }

    private Usuario MapToUsuario(UsuarioInputModel usuarioInputModel)
    {
      var usuario = new Usuario
      {
        Id = usuarioInputModel.Id,
        Nombre = usuarioInputModel.Nombre,
        Apellido = usuarioInputModel.Apellido,
        Telefono = usuarioInputModel.Telefono,
        Correo = usuarioInputModel.Correo,
        FechaNacimiento = usuarioInputModel.FechaNacimiento,
      };
      return usuario;
    }

    // GET: api/AjusteInventario
    [HttpGet]
    public IEnumerable<UsuarioViewModel> Gets()
    {
      var response = _usuarioService.Consultar().ConvertAll(p => new UsuarioViewModel(p));

      return response;
    }
    [HttpGet("{id}")]
    public ActionResult<UsuarioViewModel> Get(string id)
    {
      var usuario = _usuarioService.Consultar(id).Usuario;
      if (usuario == null) return NotFound();
      var usuarioViewModel = new UsuarioViewModel(usuario);
      usuarioViewModel.Casas = _casaService.ConsultarCasasUsuario(usuario.Id);
      usuarioViewModel.Publicaciones = _publicacionService.ConsultarPublicacionUsuario(usuario.Id);
      return usuarioViewModel;
    }
    [HttpPut("{id}")]
    public ActionResult<string> Put(Usuario usuario, string id)
    {
      var usuarioAEditar = _usuarioService.Consultar(id);
      if (usuarioAEditar == null)
      {
        return BadRequest("No se encontró el usuario");
      }
      else
      {
        var mensaje = _usuarioService.Editar(usuario).Mensaje;
        return Ok(mensaje);
      }
    }
    [HttpDelete("{id}")]
    public ActionResult<string> Delete(string id)
    {
      var usuarioAEliminar = _usuarioService.Consultar(id);
      if (usuarioAEliminar == null)
      {
        return BadRequest("Usuario no econtrado");
      }
      else
      {
        var mensaje = _usuarioService.Eliminar(id).Mensaje;
        return Ok(mensaje);
      }
    }
  }
}
