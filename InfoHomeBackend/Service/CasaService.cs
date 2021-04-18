using System;
using System.Collections.Generic;
using System.Linq;
using Data;
using Entity;

namespace Service
{
  public class CasaService
  {
    private InfoHomeContext _infoHomeContext;
    private static Random random = new Random();
    public static string RandomString(int length)
    {
      const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      return new string(Enumerable.Repeat(chars, length)
        .Select(s => s[random.Next(s.Length)]).ToArray());
    }
    public CasaService(InfoHomeContext infoHomeContext)
    {
      _infoHomeContext = infoHomeContext;
    }
    public GuardarCasaResponse Guardar(Casa casa)
    {
      try
      {
        string id = RandomString(15);
        casa.Id = id;
        var casaBuscada = _infoHomeContext.Casas.Find(casa.Id);
        if (casaBuscada != null)
        {
          return new GuardarCasaResponse("Casa ya registrada");
        }
        this._infoHomeContext.Casas.Add(casa);
        this._infoHomeContext.SaveChanges();
        return new GuardarCasaResponse(casa, "Casa guardada");
      }
      catch (Exception e)
      {
        return new GuardarCasaResponse($"Ocurrió un error {e.Message}");
      }
    }
    public List<Casa> ConsultarCasasUsuario(string idUsuario)
    {
      List<Casa> casas = new List<Casa>();
      casas = _infoHomeContext.Casas.Where(c => c.IdUsuario == idUsuario).ToList();
      return casas;
    }

    public Casa ConsultarCasasIdCasas(string Id)
    {
      Casa casa = new Casa();
      casa = _infoHomeContext.Casas.First(c => c.Id == Id);
      return casa;
    }
    public bool ConsultarCasasSearch(string search, string idCasa)
    {
      Casa casa = ConsultarCasasIdCasas(idCasa);

      if(casa.Departamento == search){
        return true;
      }else if(casa.Ciudad == search){
        return true;
      }
      return false;
    }

    public List<Casa> ConsultarCasas()
    {
      return _infoHomeContext.Casas.ToList();
    }

    public Casa Consultar(string id)
    {
      return _infoHomeContext.Casas.Find(id);
    }
    public class GuardarCasaResponse
    {
      public Casa Casa { get; set; }
      public string Mensaje { get; set; }
      public bool Error { get; set; }
      public GuardarCasaResponse(Casa casa, string mensaje)
      {
        Mensaje = mensaje;
        Casa = casa;
        Error = false;
      }
      public GuardarCasaResponse(string mensaje)
      {
        Mensaje = mensaje;
        Error = true;
      }
    }
  }
}