using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
  public class Publicacion
  {
    [Required(ErrorMessage = "Proporcione un título a la publicación")]
    public string Titulo { get; set; }
    [Required(ErrorMessage = "Seleccione un tipo: Arriendo, Venta")]
    [TipoValidacion(ErrorMessage = "Seleccione un tipo válido")]
    public string Tipo { get; set; }
    public string Detalle { get; set; }
    [Key]
    public string Id { get; set; }
    public DateTime Fecha { get; set; }
    [Required(ErrorMessage = "Se requiere la casa a publicar")]
    public string IdCasa { get; set; }
    [Required(ErrorMessage = "Se requiere el usuario que publicó")]

    public string IdUsuario { get; set; }

    public List<Imagen> Imagenes { get; set; }
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