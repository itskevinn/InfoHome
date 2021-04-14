using System.Collections.Generic;
using Entity;
namespace InfoHomeApi.Models
{
  public class PublicacionModel
  {
    public class PublicacionInputModel : Publicacion
    {

    }
    public class PublicacionViewModel : PublicacionInputModel
    {
      public PublicacionViewModel(Publicacion publicacion)
      {
        Id = publicacion.Id;
        Fecha = publicacion.Fecha;
        Detalle = publicacion.Detalle;
        Titulo = publicacion.Titulo;
        Casa = publicacion.Casa;
        Usuario = publicacion.Usuario;
      }
      public List<Imagen> Imagenes { get; set; }
    }
  }
}