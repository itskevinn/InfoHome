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
        Casa = publicacion.Casa;
        Fecha = publicacion.Fecha;
        Usuario = publicacion.Usuario;
        Imagenes = publicacion.Imagenes;
      }
    }
    public class PublicacionInputModel : Publicacion
    {

    }
  }
}