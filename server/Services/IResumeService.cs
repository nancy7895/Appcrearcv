namespace AppCv.Server.Services;

using AppCv.Server.Models;

public interface IResumeService
{
    Task<List<Resume>> GetAllAsync();
    Task<Resume?> GetByIdAsync(string id);
    Task<Resume> SaveOrUpdateAsync(Resume resume);
    Task<bool> DeleteAsync(string id);
}
