using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Data;
using Service;
using static InfoHomeBackend.InfoHomeApi.Models.PublicacionModel;

namespace InfoHomeBackend.InfoHomeApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PublicacionSearchController : ControllerBase
  {
    private readonly PublicacionService _publicacionService;

    public PublicacionSearchController(InfoHomeContext context)
    {
      _publicacionService = new PublicacionService(context);
    }

    [HttpGet("{search}")]
    public IEnumerable<PublicacionViewModel> Get(string search)
    {
      var response = _publicacionService.ConsultarPublicacionSearch(search).ConvertAll(p => new PublicacionViewModel(p));
      return response;
    }
  }
}