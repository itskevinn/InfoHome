using System.Collections.Generic;
using Entity;

namespace InfoHomeBackend.InfoHomeApi.Models
{
  public class PublicacionModel
  {
    public class PublicacionViewModel : PublicacionInputModel
    {
      public PublicacionViewModel(Publicacion publicacion)
      {
        Id = publicacion.Id;
        Titulo = publicacion.Titulo;
        Detalle = publicacion.Detalle;
        IdCasa = publicacion.IdCasa;
        Fecha = publicacion.Fecha;
        IdUsuario = publicacion.IdUsuario;
        Imagenes = publicacion.Imagenes;
        Tipo = publicacion.Tipo;
      }
      public Casa Casa { get; set; }
    }
    public class PublicacionInputModel : Publicacion
    {

    }
  }
}