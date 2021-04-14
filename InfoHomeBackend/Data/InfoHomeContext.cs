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
    public DbSet<Transaccion> Transacciones { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
  }
}
