using Microsoft.AspNetCore.Mvc;
using BackApi.Services;

namespace BackApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReflectionController : ControllerBase
{
    private readonly IReflectionService _reflectionService;

    public ReflectionController(IReflectionService reflectionService)
    {
        _reflectionService = reflectionService;
    }

    [HttpGet("importers")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string[]))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetImporters()
    {
        try
        {
            var dllNames = await _reflectionService.GetImporterDllNamesAsync();
            return Ok(dllNames);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
