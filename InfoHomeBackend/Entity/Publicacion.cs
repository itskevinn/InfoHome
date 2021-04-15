using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
  public class Publicacion
  {
    [Required(ErrorMessage = "Proporcione un título a la publicación")]
    public string Titulo { get; set; }
    public string Detalle { get; set; }
    [Key]
    public string Id { get; set; }
    public DateTime Fecha { get; set; }
    public string IdCasa { get; set; }
    [NotMapped]
    public Casa Casa { get; set; }
    public string IdUsuario { get; set; }
    [NotMapped]
    public Usuario Usuario { get; set; }
    public List<Imagen> Imagenes { get; set; }

  }
}