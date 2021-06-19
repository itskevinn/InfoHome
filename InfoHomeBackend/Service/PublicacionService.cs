using System;
using System.Collections.Generic;
using Data;
using Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Service
{
  public class PublicacionService
  {
    private InfoHomeContext _infoHomeContext;
    private ImagenService _imgService;
    private CasaService _casaService;
    private static Random random = new Random();
    public static string RandomString(int length)
    {
      const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
    }
    public PublicacionService(InfoHomeContext infoHomeContext)
    {
      _infoHomeContext = infoHomeContext;
      _imgService = new ImagenService(infoHomeContext);
      _casaService = new CasaService(infoHomeContext);
    }

    public GuardarPublicacionResponse Guardar(Publicacion publicacion)
    {
      try
      {
        string id = RandomString(15);
        publicacion.Id = id;

        var publicacionBuscada = _infoHomeContext.Publicaciones.Find(publicacion.Id);
        if (publicacionBuscada != null)
        {
          return new GuardarPublicacionResponse("Publicacion ya registrada");
        }
        GenerarCodigoImagen(publicacion);
        _infoHomeContext.Publicaciones.Add(publicacion);
        _infoHomeContext.SaveChanges();
        return new GuardarPublicacionResponse(publicacion, "Publicacion guardada exitosamente");
      }
      catch (Exception e)
      {
        return new GuardarPublicacionResponse(e.Message);
      }
    }
    public List<Publicacion> ConsultarPublicacionUsuario(string idUsuario)
    {
      List<Publicacion> publicaciones = new List<Publicacion>();
      publicaciones = _infoHomeContext.Publicaciones.Where(p => p.IdUsuario == idUsuario).ToList();
      return publicaciones;
    }

    public List<Publicacion> ConsultarPublicacionSearch(string search)
    {
      List<Publicacion> publicaciones = new List<Publicacion>();
      List<Publicacion> publicacionesSearch = new List<Publicacion>();

      foreach (var item in _infoHomeContext.Publicaciones.Include((p) => p.Imagenes).ToList())
      {
        if (_casaService.ConsultarCasasSearch(search, item.IdCasa))
        {
          publicacionesSearch.Add(item);
        }
      }
      return publicacionesSearch;
    }
    private static string GenerarCodigoCasa()
    {
      return RandomString(14);
    }
    private static void GenerarCodigoImagen(Publicacion publicacion)
    {
      foreach (var imagen in publicacion.Imagenes)
      {
        imagen.CodigoImagen = RandomString(14);
        imagen.IdPublicacion = publicacion.Id;
      }
    }

    public EditarPublicacionResponse Editar(Publicacion publicacionNueva)
    {
      try
      {
        var publicacionVieja = _infoHomeContext.Publicaciones.Find(publicacionNueva.Id);
        if (publicacionVieja != null)
        {
          publicacionVieja.Id = publicacionNueva.Id;
          publicacionVieja.Titulo = publicacionNueva.Titulo;
          publicacionVieja.Detalle = publicacionNueva.Detalle;
          publicacionVieja.IdCasa = publicacionNueva.IdCasa;
          publicacionVieja.Fecha = publicacionNueva.Fecha;
          publicacionVieja.IdUsuario = publicacionNueva.IdUsuario;
          publicacionVieja.Imagenes = publicacionNueva.Imagenes;
          _infoHomeContext.Publicaciones.Update(publicacionVieja);
          _infoHomeContext.SaveChanges();
          return new EditarPublicacionResponse(publicacionVieja, "Publicación editada correctamente");
        }
        else
        {
          return new EditarPublicacionResponse("Publicación no encontrada");
        }
      }
      catch (Exception e)
      {
        return new EditarPublicacionResponse($"Ocurrió un error al editar la publicación {e.Message}");
      }
    }
    public List<Publicacion> Consultar()
    {
      try
      {
        return _infoHomeContext.Publicaciones.Include((p) => p.Imagenes).ToList();

      }
      catch (Exception)
      {
        throw;
      }
    }
    public List<Publicacion> ConsultarPorTipo(string tipo)
    {
      try
      {
        return _infoHomeContext.Publicaciones.Include((p) => p.Imagenes).Where((p) => p.Tipo == tipo).ToList();

      }
      catch (Exception)
      {
        throw;
      }
    }
    public Publicacion Consultar(string id)
    {
      try
      {
        return _infoHomeContext.Publicaciones.Include((p) => p.Imagenes).AsNoTracking().ToList().Find((p) => p.Id == id);
      }
      catch (Exception)
      {
        throw;
      }
    }
    public EliminarPublicacionResponse Eliminar(string id)
    {
      try
      {
        var publicacionAEliminar = _infoHomeContext.Publicaciones.Find(id);
        if (publicacionAEliminar != null)
        {
          _infoHomeContext.Publicaciones.Remove(publicacionAEliminar);
          _infoHomeContext.SaveChanges();
          return new EliminarPublicacionResponse(publicacionAEliminar, "Publicación eliminado correctamente");
        }
        return new EliminarPublicacionResponse("No se encontró la publicación");
      }
      catch (Exception e)
      {
        return new EliminarPublicacionResponse("Ocurrió un error al eliminar la publicación " + e.Message);
      }
    }
    public class EliminarPublicacionResponse
    {
      public Publicacion Publicacion { get; set; }
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public EliminarPublicacionResponse(Publicacion publicacion, string mensaje)
      {
        Mensaje = mensaje;
        Publicacion = publicacion;
        Error = false;
      }
      public EliminarPublicacionResponse(string mensaje)
      {
        Mensaje = mensaje;
        Error = true;
      }
    }
    public class EditarPublicacionResponse
    {
      public Publicacion Publicacion { get; set; }
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public EditarPublicacionResponse(Publicacion publicacion, string mensaje)
      {
        Mensaje = mensaje;
        Publicacion = publicacion;
        Error = false;
      }
      public EditarPublicacionResponse(string mensaje)
      {
        Mensaje = mensaje;
        Error = true;
      }
    }
    public class GuardarPublicacionResponse
    {
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public Publicacion Publicacion { get; set; }
      public GuardarPublicacionResponse(Publicacion usuario, string mensaje)
      {
        Mensaje = mensaje;
        Publicacion = usuario;
        Error = false;
      }
      public GuardarPublicacionResponse(string mensaje)
      {
        Mensaje = mensaje;
        Error = true;
      }
    }
  }

}
