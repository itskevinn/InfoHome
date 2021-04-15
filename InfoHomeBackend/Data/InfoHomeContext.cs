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
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Publicacion>().HasOne<Usuario>().WithMany()
      .HasForeignKey(p => p.IdUsuario); 

      modelBuilder.Entity<Publicacion>().HasOne<Casa>().WithMany()
      .HasForeignKey(r => r.IdCasa);
    }
  }
}
