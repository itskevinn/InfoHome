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
    public CasaService(InfoHomeContext infoHomeContext)
    {
      _infoHomeContext = infoHomeContext;
    }
    public GuardarCasaResponse GuardarCasa(Casa casa)
    {
      try
      {
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

    public List<Casa> ConsultarCasas()
    {
      return _infoHomeContext.Casas.ToList();
    }
    public Casa ConsultarCasa(string id)
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