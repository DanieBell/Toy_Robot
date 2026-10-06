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
}
