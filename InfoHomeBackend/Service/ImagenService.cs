using System;
using System.Collections.Generic;
using System.Linq;
using Data;
using Entity;

namespace Service
{
  public class ImagenService
  {
    private InfoHomeContext _infoHomeContext;
    public ImagenService(InfoHomeContext infoHomeContext)
    {
      _infoHomeContext = infoHomeContext;
    }
    public string GuardarImagen(Imagen imagen)
    {
      try
      {
        this._infoHomeContext.Imagenes.Add(imagen);
        this._infoHomeContext.SaveChanges();
        return "Imagen guardada";
      }
      catch (Exception e)
      {
        return $"Ocurrió un error {e.Message}";
      }
    }
    public List<Imagen> ConsultarImagen()
    {
      return _infoHomeContext.Imagenes.ToList();
    }
  }
}