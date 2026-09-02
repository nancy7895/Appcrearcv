namespace AppCv.Server.Controllers;

using Microsoft.AspNetCore.Mvc;
using AppCv.Server.Models;
using AppCv.Server.Services;

[ApiController]
[Route("api/[controller]")]
public class ResumesController : ControllerBase
{
    private readonly IResumeService _resumeService;

    public ResumesController(IResumeService resumeService)
    {
        _resumeService = resumeService;
    }

    // GET: api/resumes
    [HttpGet]
    public async Task<ActionResult<List<Resume>>> GetAll()
    {
        var resumes = await _resumeService.GetAllAsync();
        return Ok(resumes);
    }

    // GET: api/resumes/cv-123
    [HttpGet("{id}")]
    public async Task<ActionResult<Resume>> GetById(string id)
    {
        var resume = await _resumeService.GetByIdAsync(id);
        if (resume == null)
        {
            return NotFound(new { message = $"Currículum con ID '{id}' no encontrado." });
        }
        return Ok(resume);
    }

    // POST: api/resumes
    [HttpPost]
    public async Task<ActionResult<Resume>> CreateOrUpdate([FromBody] Resume resume)
    {
        if (resume == null)
        {
            return BadRequest(new { message = "Los datos del currículum no son válidos." });
        }

        var saved = await _resumeService.SaveOrUpdateAsync(resume);
        return CreatedAtAction(nameof(GetById), new { id = saved.Id }, saved);
    }

    // PUT: api/resumes/cv-123
    [HttpPut("{id}")]
    public async Task<ActionResult<Resume>> Update(string id, [FromBody] Resume resume)
    {
        if (resume == null || resume.Id != id)
        {
            return BadRequest(new { message = "El ID de la ruta no coincide con el ID del currículum." });
        }

        var existing = await _resumeService.GetByIdAsync(id);
        if (existing == null)
        {
            return NotFound(new { message = $"Currículum con ID '{id}' no encontrado para actualizar." });
        }

        var updated = await _resumeService.SaveOrUpdateAsync(resume);
        return Ok(updated);
    }

    // DELETE: api/resumes/cv-123
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var deleted = await _resumeService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound(new { message = $"No se encontró el currículum con ID '{id}' para eliminar." });
        }
        return NoContent();
    }
}

