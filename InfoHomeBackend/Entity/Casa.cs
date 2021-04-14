using System.ComponentModel.DataAnnotations;
namespace Entity
{
  public class Casa
  {
    [Key]
    [Required(ErrorMessage = "Ingrese la dirección de la casa")]
    public string Dirección { get; set; }
    [Required(ErrorMessage = "Ingrese el número de cuartos")]
    public string NúmeroDeCuartos { get; set; }
    [Required(ErrorMessage = "Ingrese el número de baños")]
    public string NúmeroDeBaños { get; set; }
    [Required(ErrorMessage = "Se necesita registrar al propietario de la casa")]
    public Usuario Propietario { get; set; }
    [Required(ErrorMessage = "Seleccione un tipo: Arriendo, Venta")]
    [TipoValidacion(ErrorMessage = "Seleccione un tipo válido")]
    public string Tipo { get; set; }
    public class TipoValidacion : ValidationAttribute
    {
      protected override ValidationResult IsValid(object value, ValidationContext validationContext)
      {
        if ((value.ToString().ToLower() == "arriendo") || (value.ToString().ToLower() == "venta"))
        {
          return ValidationResult.Success;
        }
        else
        {
          return new ValidationResult(ErrorMessage);
        }
      }
    }
  }
}