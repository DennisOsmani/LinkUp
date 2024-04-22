using Interfaces;
using Microsoft.EntityFrameworkCore;
using Services;
using Repositories;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Models;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Swagger config
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Backend API", Version = "v1" });

    // Define the OAuth2.0 scheme that's in use (i.e., Implicit Flow)
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });
});

// Controller and Service config
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;     // Ignores relation cycles!!! Important!
});

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
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

// Database setup with azure secretst
var databaseConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
builder.Services.AddDbContext<Data.AppDbContext>(options => options.UseNpgsql(databaseConnectionString));

// JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ClockSkew = TimeSpan.Zero
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else // REMOVE IN PROD!
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();

