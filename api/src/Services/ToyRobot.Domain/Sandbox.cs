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
}
