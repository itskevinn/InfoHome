using System.ComponentModel.DataAnnotations;

namespace Entity
{
  public class Imagen
  {
    public string IdPublicacion { get; set; }
    [Key]
    public string Id { get; set; }
    [Required(ErrorMessage = "Se necesita la ruta de la imagen")]
    public string Ruta { get; set; }

  }
}