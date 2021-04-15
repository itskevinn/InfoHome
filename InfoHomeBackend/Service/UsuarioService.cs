using System;
using System.Collections.Generic;
using Data;
using Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
  public class UsuariosService
  {
    private InfoHomeContext _infoHomeContext;
    public UsuariosService(InfoHomeContext infoHomeContext)
    {
      _infoHomeContext = infoHomeContext;
    }

    public GuardarUsuarioResponse Guardar(Usuario usuario)
    {
      try
      {
        usuario.Id = RandomString(14);
        var usuarioBuscada = _infoHomeContext.Usuarios.Find(usuario.Id);
        if (usuarioBuscada != null)
        {
          return new GuardarUsuarioResponse("Usuario ya registrado");
        }
        _infoHomeContext.Add(usuario);
        _infoHomeContext.SaveChanges();
        return new GuardarUsuarioResponse(usuario, "Usuario guardado exitosamente");
      }
      catch (Exception e)
      {
        return new GuardarUsuarioResponse(e.Message);
      }
    }
    private static Random random = new Random();
    public static string RandomString(int length)
    {
      const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
    }
    public EditarUsuarioResponse Editar(Usuario usuarioNuevo)
    {
      try
      {
        var usuarioViejo = _infoHomeContext.Usuarios.Find(usuarioNuevo.Nombre);
        if (usuarioViejo != null)
        {
          usuarioViejo.Nombre = usuarioNuevo.Nombre;
          usuarioViejo.Id = usuarioNuevo.Id;
          usuarioViejo.Telefono = usuarioNuevo.Telefono;
          usuarioViejo.Correo = usuarioNuevo.Correo;
          usuarioViejo.FechaNacimiento = usuarioNuevo.FechaNacimiento;
          usuarioViejo.Apellido = usuarioNuevo.Apellido;
          _infoHomeContext.Usuarios.Update(usuarioViejo);
          _infoHomeContext.SaveChanges();
          return new EditarUsuarioResponse(usuarioViejo, "Usuario editado correctamente");
        }
        else
        {
          return new EditarUsuarioResponse("Usuario no Encontrado");
        }
      }
      catch (Exception e)
      {
        return new EditarUsuarioResponse($"Ocurrió un error al editar el usuario {e.Message}");
      }
    }
    public List<Usuario> Consultar()
    {
      try
      {
        return _infoHomeContext.Usuarios.ToList();

      }
      catch (Exception)
      {
        throw;
      }
    }
    public ConsultarUsuarioResponse Consultar(string id)
    {
      try
      {
        var usuarioEncontrado = _infoHomeContext.Usuarios.Find(id);
        if (usuarioEncontrado == null)
        {
          return new ConsultarUsuarioResponse("Usuario no Encontrado");
        }
        return new ConsultarUsuarioResponse(_infoHomeContext.Usuarios.Find(id), "Usuario consultado exitosamente");
      }
      catch (Exception e)
      {
        return new ConsultarUsuarioResponse("Ocurrió un error al hacer la consulta " + e.Message);
      }
    }
    public EliminarUsuarioResponse Eliminar(string id)
    {
      try
      {
        var usuarioAEliminar = _infoHomeContext.Usuarios.Find(id);
        if (usuarioAEliminar != null)
        {
          _infoHomeContext.Usuarios.Remove(usuarioAEliminar);
          _infoHomeContext.SaveChanges();
          return new EliminarUsuarioResponse(usuarioAEliminar, "Usuario eliminado correctamente");
        }
        return new EliminarUsuarioResponse("No se encontró el usuario");
      }
      catch (Exception e)
      {
        return new EliminarUsuarioResponse("Ocurrió un error al eliminar el usuario " + e.Message);
      }
    }
    public class EliminarUsuarioResponse
    {
      public Usuario Usuario { get; set; }
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public EliminarUsuarioResponse(Usuario usuario, string mensaje)
      {
        Mensaje = mensaje;
        Usuario = usuario;
        Error = false;
      }
      public EliminarUsuarioResponse(string mensaje)
      {
        Mensaje = mensaje;
        Error = true;
      }
    }
    public class EditarUsuarioResponse
    {
      public Usuario Usuario { get; set; }
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public EditarUsuarioResponse(Usuario usuario, string mensaje)
      {
        Mensaje = mensaje;
        Usuario = usuario;
        Error = false;
      }
      public EditarUsuarioResponse(string mensaje)
      {
        Mensaje = mensaje;
        Error = true;
      }
    }
    public class ConsultarUsuarioResponse
    {
      public Usuario Usuario { get; set; }
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public ConsultarUsuarioResponse(Usuario usuario, string mensaje)
      {
        Mensaje = mensaje;
        Usuario = usuario;
        Error = false;
      }
      public ConsultarUsuarioResponse(string mensaje)
      {
        Error = true;
        Mensaje = mensaje;
      }
    }
    public class ConsultarUsuariosResponse
    {
      public List<Usuario> Usuarios { get; set; }
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public ConsultarUsuariosResponse(List<Usuario> usuarios, string mensaje)
      {
        Error = false;
        Usuarios = usuarios;
        Mensaje = mensaje;
      }
      public ConsultarUsuariosResponse(string mensaje)
      {
        Error = true;
        Mensaje = mensaje;
      }
    }
    public class GuardarUsuarioResponse
    {
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public Usuario Usuario { get; set; }
      public GuardarUsuarioResponse(Usuario usuario, string mensaje)
      {
        Mensaje = mensaje;
        Usuario = usuario;
        Error = false;
      }
      public GuardarUsuarioResponse(string mensaje)
      {
        Mensaje = mensaje;
        Error = true;
      }
    }
  }

}
