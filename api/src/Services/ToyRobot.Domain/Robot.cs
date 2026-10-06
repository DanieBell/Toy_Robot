namespace ToyRobot.Domain;

public class Robot
{
    public Position? Position { get; private set; }
    public Direction? Facing { get; private set; }

    public bool IsPlaced => Position.HasValue;

    private Robot() { }

    public static Robot CreateUnplaced() => new();

    public void Place(Position position, Direction facing)
    {
        Position = position;
        Facing = facing;
    }

    public Position NextPosition()
    {
        if (!IsPlaced)
            throw new InvalidOperationException("Robot must be placed before it can move.");

        return Facing!.Value switch
        {
            Direction.North => new Position(Position!.Value.X, Position.Value.Y + 1),
            Direction.East => new Position(Position!.Value.X + 1, Position.Value.Y),
            Direction.South => new Position(Position!.Value.X, Position.Value.Y - 1),
            Direction.West => new Position(Position!.Value.X - 1, Position.Value.Y),
            _ => throw new InvalidOperationException($"Unknown direction: {Facing}.")
        };
    }

    public void MoveTo(Position position)
    {
        Position = position;
    }

    public void TurnLeft()
    {
        if (!IsPlaced)
            throw new InvalidOperationException("Robot must be placed before it can turn.");

        Facing = (Direction)(((int)Facing!.Value + 3) % 4);
    }

    public void TurnRight()
    {
        if (!IsPlaced)
            throw new InvalidOperationException("Robot must be placed before it can turn.");

        Facing = (Direction)(((int)Facing!.Value + 1) % 4);
    }
}
