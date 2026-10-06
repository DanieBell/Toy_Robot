using System.ComponentModel.DataAnnotations;

namespace ToyRobot.Api.Contracts;

public class CreateSandboxRequest
{
    [Range(1, 20, ErrorMessage = "Table width must be between 1 and 20.")]
    public int TableWidth { get; init; }

    [Range(1, 20, ErrorMessage = "Table height must be between 1 and 20.")]
    public int TableHeight { get; init; }
}
