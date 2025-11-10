using System.Reflection;
using IImporter;

namespace BackApi.Services;

public class ReflectionService : IReflectionService
{
    private readonly string _reflectionDirectoryPath;

    public ReflectionService(IWebHostEnvironment environment)
    {
        _reflectionDirectoryPath = Path.Combine(environment.ContentRootPath, "reflection");
    }

    public async Task<IEnumerable<string>> GetImporterDllNamesAsync()
    {
        return await Task.Run(() =>
        {
            if (!Directory.Exists(_reflectionDirectoryPath))
            {
                return Enumerable.Empty<string>();
            }

            var dllFiles = Directory.GetFiles(_reflectionDirectoryPath, "*.dll");

            if (dllFiles.Length == 0)
            {
                return Enumerable.Empty<string>();
            }

            return ExtractValidDllNames(dllFiles);
        });
    }

    private IEnumerable<string> ExtractValidDllNames(string[] dllPaths)
    {
        var validDllNames = new List<string>();

        foreach (var dllPath in dllPaths)
        {
            if (TryProcessDll(dllPath, out var dllName))
            {
                validDllNames.Add(dllName);
            }
        }

        return validDllNames;
    }

    private bool TryProcessDll(string dllPath, out string dllName)
    {
        dllName = Path.GetFileName(dllPath);

        try
        {
            var assembly = Assembly.LoadFrom(dllPath);
            var types = assembly.GetTypes();

            return types.Any(type =>
                type.IsPublic &&
                !type.IsAbstract &&
                !type.IsInterface &&
                typeof(ImporterInterface).IsAssignableFrom(type)
            );
        }
        catch (ReflectionTypeLoadException)
        {
            return false;
        }
        catch (BadImageFormatException)
        {
            return false;
        }
    }
}

