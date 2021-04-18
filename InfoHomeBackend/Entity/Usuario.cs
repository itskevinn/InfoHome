using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entity
{
  public class Usuario
  {
    [Key]
    [StringLength(30, ErrorMessage = "Número de identificación demasiado largo")]
    [Required(ErrorMessage = "Se requiere un número de identificación")]
    public string Id { get; set; }
    [Required(ErrorMessage = "Se requiere un nombre")]
    [StringLength(15, ErrorMessage = "Proporcione un nombre válido")]
    public string Nombre { get; set; }
    [Required(ErrorMessage = "Se requiere un apellido")]
    [StringLength(30, ErrorMessage = "Proporcione un apellido válido")]
    public string Apellido { get; set; }
    public DateTime FechaNacimiento { get; set; }
    [StringLength(50, ErrorMessage = "Correo demasiado largo, por favor, proporcione una dirección de correo más corta")]
    public string Correo { get; set; }
    [DataType(DataType.PhoneNumber, ErrorMessage = "Ingrese un número de teléfono válido.")]
    [StringLength(13, ErrorMessage = "Proporcione un número de teléfono válido")]
    public string Telefono { get; set; }
    public List<Casa> Casas { get; set; }
    public List<Publicacion> Publicaciones { get; set; }
  }
}
