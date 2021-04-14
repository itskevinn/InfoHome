using System;
namespace Entity
{
  public class Transaccion
  {
    public string Id { get; set; }
    public string Precio { get; set; }
    public Casa Casa { get; set; }
    public DateTime Fecha { get; set; }
    public string Tipo { get; set; }

  }
}