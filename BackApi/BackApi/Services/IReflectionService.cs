namespace BackApi.Services;

public interface IReflectionService
{
    Task<IEnumerable<string>> GetImporterDllNamesAsync();
}

