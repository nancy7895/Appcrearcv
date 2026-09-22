namespace AppCv.Server.Services;

using Microsoft.EntityFrameworkCore;
using AppCv.Server.Data;
using AppCv.Server.Models;

public class ResumeService : IResumeService
{
    private readonly AppDbContext _context;

    public ResumeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Resume>> GetAllAsync()
    {
        var list = await _context.Resumes.AsNoTracking().ToListAsync();
        if (!list.Any())
        {
            var defaultResume = new Resume();
            _context.Resumes.Add(defaultResume);
            await _context.SaveChangesAsync();
            return new List<Resume> { defaultResume };
        }
        return list;
    }

    public async Task<Resume?> GetByIdAsync(string id)
    {
        return await _context.Resumes.AsNoTracking().FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<Resume> SaveOrUpdateAsync(Resume resume)
    {
        resume.LastModified = DateTime.UtcNow.ToString("o");

        var existing = await _context.Resumes.FirstOrDefaultAsync(r => r.Id == resume.Id);

        if (existing == null)
        {
            _context.Resumes.Add(resume);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(resume);
            existing.PersonalInfo = resume.PersonalInfo;
            existing.Experience = resume.Experience;
            existing.Education = resume.Education;
            existing.Skills = resume.Skills;
            existing.Languages = resume.Languages;
            existing.Projects = resume.Projects;
            existing.Certifications = resume.Certifications;
        }

        await _context.SaveChangesAsync();
        return resume;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        var existing = await _context.Resumes.FirstOrDefaultAsync(r => r.Id == id);
        if (existing == null) return false;

        _context.Resumes.Remove(existing);
        await _context.SaveChangesAsync();
        return true;
    }
}
