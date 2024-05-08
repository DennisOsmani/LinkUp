# All commands and installations used

- dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL (Driver for Postgresql)
- dotnet add package Microsoft.EntityFrameworkCore.Design (DB greier els?)
- dotnet add package Swashbuckle.AspNetCore (Måtte ha denne, vet ikke hvorfor)

## Ef Core

- dotnet tool install --global dotnet-ef (Global installering)
- dotnet ef migrations add InitialCreate (Create new schemas for updated database)
- dotnet ef database update (Updates the database based on the migrations schema)

