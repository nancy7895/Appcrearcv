namespace AppCv.Server.Controllers;

using Microsoft.AspNetCore.Mvc;
using AppCv.Server.Models;
using AppCv.Server.Services;

[ApiController]
[Route ("api/[controller]")]

public class ResumesController : ControllerBase
{
private readonly IResumeService _resumeService;

public ResumesController(IResumeService resumeService)
{
_resumeService = resumeService;
}

[HttpGet] public async Task<ActionResult<List<Resume>>> GetAll()
{
var resumes = await _resumeService.GetAllAsync();
return ok (resumes);

}

[HttpGet("{id}")]
public async Task<ActionResult<Resume>> GetById(string id)
{
    var resume = await _resumeService.GetByIdAsync(id);
    if(resume == null)
    {
        return NotFound(new{message = $"Curricululum con ID '{id}'no encontrado"});
    }
    return ok(resume);
}

[HttpPost]public async Task<ActionResult<Resume>> CreateOrUpdate([FromBody]Resume resume)
{
if (resume == null)
{
return BadRequest(new{message = "Los datos del curriculum no son validos"});
}
var saved = await _resumeService.SaveOrUpdateAsync(resume);
return CreatedAtAction(nameof(GetById),new{id = save.id}, saved);
}

[HttpPut("{id}")]
public async Task<ActionResult<Resume>> Update(string id, [FromBody]Resume resume)
{
if(resume == null || resume.Id != id)
{
return BadRequest(new{message = "El ID de la ruta no coincide con el ID del curriculum"});

}

var existing =await _resumeService.GetById(id);
if (existing == null)
{
return NotFound(new{message = $"Curriculum con ID '{id}' no encontrada para actualizar"});
var updated = await _resumeService.SaveoOrUpdateAsync(resume);
return ok(update);
}
}

[HttpDelete("{id}")]
public async Task<IActionResult> Delete (string id)
{
    var delete = awair _resumeService.DeleteAsync(id);
    if(!delete)
    {
        return NotFound(new {message = $"No se encontro el curriculum con ID '{id}' para eliminar"});
    }
    return NoContent();
}


}
