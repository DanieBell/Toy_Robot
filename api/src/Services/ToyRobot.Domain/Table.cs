namespace ToyRobot.Domain;

public class Table
{
    public int Width { get; }
    public int Height { get; }

    private Table(int width, int height)
    {
        Width = width;
        Height = height;
    }

    public static Table Create(int width, int height)
    {
        if (width < 1 || width > 10)
            throw new ArgumentOutOfRangeException(nameof(width), "Table width must be between 1 and 10.");

        if (height < 1 || height > 10)
            throw new ArgumentOutOfRangeException(nameof(height), "Table height must be between 1 and 10.");

        return new Table(width, height);
    }

    public bool IsInBounds(Position position)
    {
        return position.X >= 0
            && position.X < Width
            && position.Y >= 0
            && position.Y < Height;
    }
}
