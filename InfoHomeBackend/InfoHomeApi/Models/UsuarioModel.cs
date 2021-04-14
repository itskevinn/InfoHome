using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;

namespace InfoHomeApi.Models
{
  public class UsuarioModel
  {
    public class UsuarioInputModel : Usuario
    {

    }
    public class UsuarioViewModel : UsuarioInputModel
    {
      public UsuarioViewModel(Usuario usuario)
      {
        Id = usuario.Id;
        Nombre = usuario.Nombre;
        Apellido = usuario.Apellido;
        Telefono = usuario.Telefono;
        Correo = usuario.Correo;
        FechaNacimiento = usuario.FechaNacimiento;
      }
      public List<Casa> Casas { get; set; }
      public List<Transaccion> Transacciones { get; set; }
      public List<Publicacion> Publicaciones { get; set; }
    }
  }
}
