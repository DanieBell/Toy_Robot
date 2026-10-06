using System.ComponentModel.DataAnnotations;

namespace ToyRobot.Api.Contracts;

public class CreateSandboxRequest
{
    [Range(1, 10, ErrorMessage = "Table width must be between 1 and 10.")]
    public int TableWidth { get; init; }

    [Range(1, 10, ErrorMessage = "Table height must be between 1 and 10.")]
    public int TableHeight { get; init; }
}
