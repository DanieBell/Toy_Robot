using Microsoft.AspNetCore.Mvc;
using ToyRobot.Api.Contracts;
using ToyRobot.Domain;

namespace ToyRobot.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SandboxController : ControllerBase
{
    private readonly ISandboxRepository _repository;

    public SandboxController(ISandboxRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    [ProducesResponseType(typeof(SandboxResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    public ActionResult<SandboxResponse> Create([FromBody] CreateSandboxRequest request)
    {
        var sandbox = Sandbox.Create(request.TableWidth, request.TableHeight);
        _repository.Add(sandbox);

        var response = SandboxResponse.FromDomain(sandbox);
        return CreatedAtAction(nameof(GetById), new { id = sandbox.Id }, response);
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(SandboxResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<SandboxResponse> GetById(Guid id)
    {
        var sandbox = _repository.GetById(id);
        if (sandbox is null)
            return NotFound();

        return Ok(SandboxResponse.FromDomain(sandbox));
    }

    [HttpPost("{id:guid}/robot")]
    [ProducesResponseType(typeof(SandboxResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<SandboxResponse> PlaceRobot(Guid id, [FromBody] PlaceRobotRequest request)
    {
        var sandbox = _repository.GetById(id);
        if (sandbox is null)
            return NotFound();

        try
        {
            sandbox.PlaceRobot(request.X, request.Y, request.Facing);
        }
        catch (InvalidOperationException ex)
        {
            ModelState.AddModelError(nameof(request.X), ex.Message);
            return ValidationProblem(ModelState);
        }

        return Ok(SandboxResponse.FromDomain(sandbox));
    }
}
