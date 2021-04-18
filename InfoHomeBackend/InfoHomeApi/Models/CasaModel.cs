using Entity;

namespace InfoHomeBackend.InfoHomeApi.Models
{
  public class CasaViewModel : CasaInputModel
  {
    public CasaViewModel(Casa casa)
    {
      Id = casa.Id;
      NumeroDeBanos = casa.NumeroDeBanos;
      NumeroDeCuartos = casa.NumeroDeCuartos;
      Barrio = casa.Barrio;
      Direccion = casa.Direccion;
      Departamento = casa.Departamento;
      Ciudad = casa.Ciudad;
      IdUsuario = casa.IdUsuario;
    }
  }
  public class CasaInputModel : Casa
  {

  }
}
