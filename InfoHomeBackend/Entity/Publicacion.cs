using System;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
  public class Publicacion
  {
    [Required(ErrorMessage = "Proporcione un título a la publicación")]
    public string Titulo { get; set; }
    public string Detalle { get; set; }
    [Key]
    [Required(ErrorMessage = "La publicación necesita un id")]
    public string Id { get; set; }
    public DateTime Fecha { get; set; }
    public Casa Casa { get; set; }
    public Usuario Usuario { get; set; }

  }
}