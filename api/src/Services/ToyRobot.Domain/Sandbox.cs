namespace ToyRobot.Domain;

public class Sandbox
{
    public Guid Id { get; }
    public Table Table { get; }
    public Robot Robot { get; }

    private Sandbox(Guid id, Table table, Robot robot)
    {
        Id = id;
        Table = table;
        Robot = robot;
    }

    public static Sandbox Create(int tableWidth, int tableHeight)
    {
        var table = Table.Create(tableWidth, tableHeight);
        var robot = Robot.CreateUnplaced();
        return new Sandbox(Guid.NewGuid(), table, robot);
    }

    public void PlaceRobot(int x, int y, Direction facing)
    {
        var position = new Position(x, y);

        if (!Table.IsInBounds(position))
            throw new InvalidOperationException(
                $"Position ({x}, {y}) is out of bounds for a {Table.Width}x{Table.Height} table.");

        Robot.Place(position, facing);
    }
}
