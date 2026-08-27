namespace AppCv.Server.Services;

using System.Text.Json;
using AppCv.Server.Models;

public class ResumeService : IResumeService
{
    private readonly string _filePath;
    private readonly JsonSerializerOptions _jsonOptions;
    private static readonly SemaphoreSlim _lock = new SemaphoreSlim(1, 1);

    public ResumeService(IWebHostEnvironment env)
    {
        var dataFolder = Path.Combine(env.ContentRootPath, "Data");
        if (!Directory.Exists(dataFolder))
        {
            Directory.CreateDirectory(dataFolder);
        }

        _filePath = Path.Combine(dataFolder, "resumes.json");

        _jsonOptions = new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    public async Task<List<Resume>> GetAllAsync()
    {
        await _lock.WaitAsync();
        try
        {
            if (!File.Exists(_filePath))
            {
                var initialList = new List<Resume> { new Resume() };
                var json = JsonSerializer.Serialize(initialList, _jsonOptions);
                await File.WriteAllTextAsync(_filePath, json);
                return initialList;
            }

            var content = await File.ReadAllTextAsync(_filePath);
            var resumes = JsonSerializer.Deserialize<List<Resume>>(content, _jsonOptions);
            return resumes ?? new List<Resume>();
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task<Resume?> GetByIdAsync(string id)
    {
        var all = await GetAllAsync();
        return all.FirstOrDefault(r => r.Id == id);
    }

    public async Task<Resume> SaveOrUpdateAsync(Resume resume)
    {
        await _lock.WaitAsync();
        try
        {
            var all = new List<Resume>();
            if (File.Exists(_filePath))
            {
                var content = await File.ReadAllTextAsync(_filePath);
                all = JsonSerializer.Deserialize<List<Resume>>(content, _jsonOptions) ?? new List<Resume>();
            }

            resume.LastModified = DateTime.UtcNow.ToString("o");

            var index = all.FindIndex(r => r.Id == resume.Id);
            if (index >= 0)
            {
                all[index] = resume;
            }
            else
            {
                all.Add(resume);
            }

            var updatedJson = JsonSerializer.Serialize(all, _jsonOptions);
            await File.WriteAllTextAsync(_filePath, updatedJson);

            return resume;
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task<bool> DeleteAsync(string id)
    {
        await _lock.WaitAsync();
        try
        {
            if (!File.Exists(_filePath)) return false;

            var content = await File.ReadAllTextAsync(_filePath);
            var all = JsonSerializer.Deserialize<List<Resume>>(content, _jsonOptions) ?? new List<Resume>();

            var item = all.FirstOrDefault(r => r.Id == id);
            if (item == null) return false;

            all.Remove(item);

            var updatedJson = JsonSerializer.Serialize(all, _jsonOptions);
            await File.WriteAllTextAsync(_filePath, updatedJson);

            return true;
        }
        finally
        {
            _lock.Release();
        }
    }
}
