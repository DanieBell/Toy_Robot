using ToyRobot.Domain;

namespace ToyRobot.Api.Contracts;

public record SandboxResponse(Guid Id, TableDto Table, RobotDto Robot)
{
    public static SandboxResponse FromDomain(Sandbox sandbox) =>
        new(
            sandbox.Id,
            new TableDto(sandbox.Table.Width, sandbox.Table.Height),
            RobotDto.FromDomain(sandbox.Robot));
}

public record TableDto(int Width, int Height);

public record RobotDto(bool IsPlaced, int? X, int? Y, string? Facing)
{
    public static RobotDto FromDomain(Robot robot) =>
        new(
            robot.IsPlaced,
            robot.Position?.X,
            robot.Position?.Y,
            robot.Facing?.ToString());
}
