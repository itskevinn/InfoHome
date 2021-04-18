using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity
{
  public class Casa
  {
    [Key]
    [Required(ErrorMessage = "Esta casa ya se encuentra registrada")]
    public string Id { get; set; }
    [Required(ErrorMessage = "Ingrese el número de cuartos")]
    public string NumeroDeCuartos { get; set; }
    [Required(ErrorMessage = "Ingrese el número de baños")]
    public string NumeroDeBanos { get; set; }
    [Required(ErrorMessage = "Se requiere al propietario de la casa")]
    public string IdUsuario { get; set; }

    [Required(ErrorMessage = "Se requiere una dirección")]
    public string Direccion { get; set; }
    [Required(ErrorMessage = "Se requiere un departamento")]
    public string Departamento { get; set; }
    [Required(ErrorMessage = "Se requiere una ciudad")]
    public string Ciudad { get; set; }
    [Required(ErrorMessage = "Se requiere un barrio")]
    public string Barrio { get; set; }

  }
}