using Microsoft.EntityFrameworkCore;
using Models;

namespace Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users;
    public DbSet<UserRelation> UserRelations;
    public DbSet<Event> Events;
    public DbSet<EventRelation> EventRelations;
    public DbSet<Location> Locations;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey();

        modelBuilder.Entity<UserRelation>().HasKey();

        modelBuilder.Entity<Event>().HasKey();

        modelBuilder.Entity<EventRelation>().HasKey();

        modelBuilder.Entity<Location>().HasKey();

        // Fortsett her
    }
}