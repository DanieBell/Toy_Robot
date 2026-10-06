using System.ComponentModel.DataAnnotations;

namespace ToyRobot.Api.Contracts;

public class CreateSandboxRequest
{
    [Range(1, 100, ErrorMessage = "Table width must be between 1 and 100.")]
    public int TableWidth { get; init; }

    [Range(1, 100, ErrorMessage = "Table height must be between 1 and 100.")]
    public int TableHeight { get; init; }
}
