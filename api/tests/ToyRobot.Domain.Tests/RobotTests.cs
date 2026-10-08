using ToyRobot.Domain;

namespace ToyRobot.Domain.Tests;

public class RobotTests
{
    [Fact]
    public void CreateUnplaced_IsNotPlaced()
    {
        var robot = Robot.CreateUnplaced();

        Assert.False(robot.IsPlaced);
        Assert.Null(robot.Position);
        Assert.Null(robot.Facing);
    }

    [Fact]
    public void Place_SetsPositionAndFacing()
    {
        var robot = Robot.CreateUnplaced();

        robot.Place(new Position(1, 2), Direction.East);

        Assert.True(robot.IsPlaced);
        Assert.Equal(new Position(1, 2), robot.Position);
        Assert.Equal(Direction.East, robot.Facing);
    }

    [Theory]
    [InlineData(Direction.North, 2, 3)]
    [InlineData(Direction.East, 3, 2)]
    [InlineData(Direction.South, 2, 1)]
    [InlineData(Direction.West, 1, 2)]
    public void NextPosition_ReturnsCellAheadForEachFacing(
        Direction facing,
        int expectedX,
        int expectedY)
    {
        var robot = Robot.CreateUnplaced();
        robot.Place(new Position(2, 2), facing);

        var next = robot.NextPosition();

        Assert.Equal(new Position(expectedX, expectedY), next);
    }

    [Fact]
    public void NextPosition_WhenUnplaced_Throws()
    {
        var robot = Robot.CreateUnplaced();

        Assert.Throws<InvalidOperationException>(() => robot.NextPosition());
    }

    [Theory]
    [InlineData(Direction.North, Direction.West)]
    [InlineData(Direction.West, Direction.South)]
    [InlineData(Direction.South, Direction.East)]
    [InlineData(Direction.East, Direction.North)]
    public void TurnLeft_RotatesCounterClockwise(Direction start, Direction expected)
    {
        var robot = Robot.CreateUnplaced();
        robot.Place(new Position(0, 0), start);

        robot.TurnLeft();

        Assert.Equal(expected, robot.Facing);
    }

    [Theory]
    [InlineData(Direction.North, Direction.East)]
    [InlineData(Direction.East, Direction.South)]
    [InlineData(Direction.South, Direction.West)]
    [InlineData(Direction.West, Direction.North)]
    public void TurnRight_RotatesClockwise(Direction start, Direction expected)
    {
        var robot = Robot.CreateUnplaced();
        robot.Place(new Position(0, 0), start);

        robot.TurnRight();

        Assert.Equal(expected, robot.Facing);
    }

    [Fact]
    public void TurnLeft_WhenUnplaced_Throws()
    {
        var robot = Robot.CreateUnplaced();

        Assert.Throws<InvalidOperationException>(() => robot.TurnLeft());
    }

    [Fact]
    public void TurnRight_WhenUnplaced_Throws()
    {
        var robot = Robot.CreateUnplaced();

        Assert.Throws<InvalidOperationException>(() => robot.TurnRight());
    }
}
