using Microsoft.EntityFrameworkCore;
using Models;

namespace Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<UserRelation> UserRelations { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventRelation> EventRelations { get; set; }
    public DbSet<Location> Locations { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        /* UserRelation */
        modelBuilder.Entity<UserRelation>()
            .HasKey(ur => ur.UserRelationID);

        modelBuilder.Entity<UserRelation>()
            .HasOne(ur => ur.User_first)
            .WithMany(u => u.UserRelationsAsFirst)
            .HasForeignKey(ur => ur.User_first_ID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserRelation>()
            .HasOne(ur => ur.User_second)
            .WithMany(u => u.UserRelationsAsSecond)
            .HasForeignKey(ur => ur.User_second_ID)
            .OnDelete(DeleteBehavior.Cascade);

        /* EventRelation */
        modelBuilder.Entity<EventRelation>()
            .HasKey(er => er.EventRelationID);

        modelBuilder.Entity<EventRelation>()
            .HasOne(ev => ev.Event)
            .WithMany(e => e.EventRelations)
            .HasForeignKey(er => er.EventID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<EventRelation>()
            .HasOne(er => er.User)
            .WithMany(u => u.EventRelations)
            .HasForeignKey(ur => ur.UserID);

        /* Location */
        modelBuilder.Entity<Location>()
            .HasKey(l => l.LocationID);

        modelBuilder.Entity<Location>()
            .HasOne(l => l.Event)
            .WithOne(e => e.Location)
            .HasForeignKey<Location>("EventID")
            .OnDelete(DeleteBehavior.Cascade);

        /* Event */
        modelBuilder.Entity<Event>()
            .HasKey(e => e.EventID);

        /* User */
        modelBuilder.Entity<User>()
            .HasKey(u => u.UserID);        
    }
}