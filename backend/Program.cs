var builder = WebApplication.CreateBuilder(args);

// Swagger config
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Controller config
builder.Services.AddControllers();

// EF Core DbContext fonfig
// TODO

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
// app.UseSession();        Not configured!!
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();

