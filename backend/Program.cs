using Interfaces;
using Microsoft.EntityFrameworkCore;
using Services;
using Repositories;

var builder = WebApplication.CreateBuilder(args);

// Swagger config
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Controller config
builder.Services.AddControllers();

// Service config
builder.Services.AddScoped<IEventRelationService, EventRelationService>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IUserRelationService, UserRelationService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<LocationService>();

// Repository config
builder.Services.AddScoped<EventRelationRepository>();
builder.Services.AddScoped<EventRepository>();
builder.Services.AddScoped<UserRelationRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<LocationRepository>();

// EF Core DbContext fonfig
builder.Services.AddDbContext<Data.AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();

