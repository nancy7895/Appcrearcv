using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using AppCv.Server.Data;
using AppCv.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Configurar DbContext con PostgreSQL (Neon)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar servicio de currículums (Scoped para trabajar con DbContext)
builder.Services.AddScoped<IResumeService, ResumeService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Asegurar que las tablas existan en Neon
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var dbCreator = (Microsoft.EntityFrameworkCore.Storage.RelationalDatabaseCreator)db.Database.GetService<Microsoft.EntityFrameworkCore.Storage.IDatabaseCreator>();
    try
    {
        await dbCreator.CreateTablesAsync();
    }
    catch (Npgsql.PostgresException ex) when (ex.SqlState == "42P07")
    {
        // La tabla ya existe, continuar normalmente
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
