using System;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Data
{
  public class InfoHomeContext : DbContext
  {
    public InfoHomeContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<Casa> Casas { get; set; }
    public DbSet<Imagen> Imagenes { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Publicacion> Publicaciones { get; set; }
  }
}
