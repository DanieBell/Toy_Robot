using ToyRobot.Domain;

namespace ToyRobot.Domain.Tests;

public class SandboxTests
{
    private static Sandbox CreatePlacedSandbox(
        int x = 2,
        int y = 2,
        Direction facing = Direction.North)
    {
        var sandbox = Sandbox.Create(5, 5);
        sandbox.PlaceRobot(x, y, facing);
        return sandbox;
    }

    [Fact]
    public void Create_StartsWithUnplacedRobotAndEmptyLog()
    {
        var sandbox = Sandbox.Create(5, 5);

        Assert.False(sandbox.Robot.IsPlaced);
        Assert.Empty(sandbox.Log);
    }

    [Fact]
    public void PlaceRobot_WithinBounds_PlacesAndLogs()
    {
        var sandbox = Sandbox.Create(5, 5);

        sandbox.PlaceRobot(1, 2, Direction.East);

        Assert.True(sandbox.Robot.IsPlaced);
        Assert.Equal(new Position(1, 2), sandbox.Robot.Position);
        Assert.Equal(Direction.East, sandbox.Robot.Facing);
        var entry = Assert.Single(sandbox.Log);
        Assert.Equal("Robot placed at X: 1, Y: 2, facing EAST", entry);
    }

    [Fact]
    public void PlaceRobot_OutOfBounds_ThrowsAndDoesNotLog()
    {
        var sandbox = Sandbox.Create(5, 5);

        Assert.Throws<InvalidOperationException>(
            () => sandbox.PlaceRobot(5, 0, Direction.North));
        Assert.False(sandbox.Robot.IsPlaced);
        Assert.Empty(sandbox.Log);
    }

    [Fact]
    public void MoveRobot_WhenUnplaced_Throws()
    {
        var sandbox = Sandbox.Create(5, 5);

        Assert.Throws<InvalidOperationException>(() => sandbox.MoveRobot());
    }

    [Fact]
    public void MoveRobot_WithinBounds_MovesAndLogs()
    {
        var sandbox = CreatePlacedSandbox(2, 2, Direction.North);

        sandbox.MoveRobot();

        Assert.Equal(new Position(2, 3), sandbox.Robot.Position);
        Assert.Equal("Moved to X: 2, Y: 3, facing NORTH", sandbox.Log.Last());
    }

    [Fact]
    public void MoveRobot_OffTable_ThrowsAndDoesNotMove()
    {
        var sandbox = CreatePlacedSandbox(0, 4, Direction.North);

        Assert.Throws<InvalidOperationException>(() => sandbox.MoveRobot());
        Assert.Equal(new Position(0, 4), sandbox.Robot.Position);
        Assert.Single(sandbox.Log);
    }

    [Fact]
    public void TurnRobotLeft_UpdatesFacingAndLogs()
    {
        var sandbox = CreatePlacedSandbox(2, 2, Direction.North);

        sandbox.TurnRobotLeft();

        Assert.Equal(Direction.West, sandbox.Robot.Facing);
        Assert.Equal("Turned left, now facing WEST", sandbox.Log.Last());
    }

    [Fact]
    public void TurnRobotRight_UpdatesFacingAndLogs()
    {
        var sandbox = CreatePlacedSandbox(2, 2, Direction.North);

        sandbox.TurnRobotRight();

        Assert.Equal(Direction.East, sandbox.Robot.Facing);
        Assert.Equal("Turned right, now facing EAST", sandbox.Log.Last());
    }

    [Fact]
    public void TurnRobotLeft_WhenUnplaced_Throws()
    {
        var sandbox = Sandbox.Create(5, 5);

        Assert.Throws<InvalidOperationException>(() => sandbox.TurnRobotLeft());
    }

    [Fact]
    public void Log_AccumulatesEntriesInOrder()
    {
        var sandbox = CreatePlacedSandbox(0, 0, Direction.North);

        sandbox.MoveRobot();
        sandbox.TurnRobotRight();

        Assert.Equal(
            new[]
            {
                "Robot placed at X: 0, Y: 0, facing NORTH",
                "Moved to X: 0, Y: 1, facing NORTH",
                "Turned right, now facing EAST",
            },
            sandbox.Log);
    }
}
