using AppCv.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Inyección de Dependencias: Registramos nuestro ResumeService
builder.Services.AddSingleton<IResumeService, ResumeService>();

// 2. Configuración de CORS para permitir peticiones desde React (Vite)
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

// Configuración del Pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 3. Activar la política de CORS (¡Debe ir antes de MapControllers!)
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();

