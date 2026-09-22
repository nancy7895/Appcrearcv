using Microsoft.EntityFrameworkCore;
using AppCv.Server.Models;

namespace AppCv.Server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Resume> Resumes => Set<Resume>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Resume>(entity =>
        {
            entity.HasKey(r => r.Id);

            entity.OwnsOne(r => r.PersonalInfo, b => b.ToJson());
            entity.OwnsMany(r => r.Experience, b => b.ToJson());
            entity.OwnsMany(r => r.Education, b => b.ToJson());
            entity.OwnsMany(r => r.Skills, b => b.ToJson());
            entity.OwnsMany(r => r.Languages, b => b.ToJson());
            entity.OwnsMany(r => r.Projects, b => b.ToJson());
            entity.OwnsMany(r => r.Certifications, b => b.ToJson());
        });
    }
}
