using System.ComponentModel.DataAnnotations;

namespace Entity
{
  public class Imagen
  {
    public string Valor { get; set; }
    [Key]
    public string IdImagen { get; set; }
    public string IdPublicacion { get; set; }
  }
}