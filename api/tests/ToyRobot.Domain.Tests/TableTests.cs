using ToyRobot.Domain;

namespace ToyRobot.Domain.Tests;

public class TableTests
{
    [Fact]
    public void Create_WithValidDimensions_SetsWidthAndHeight()
    {
        var table = Table.Create(5, 7);

        Assert.Equal(5, table.Width);
        Assert.Equal(7, table.Height);
    }

    [Theory]
    [InlineData(0, 5)]
    [InlineData(5, 0)]
    [InlineData(-1, 5)]
    [InlineData(11, 5)]
    [InlineData(5, 11)]
    public void Create_WithOutOfRangeDimensions_Throws(int width, int height)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => Table.Create(width, height));
    }

    [Theory]
    [InlineData(0, 0)]
    [InlineData(4, 4)]
    [InlineData(2, 3)]
    public void IsInBounds_WithPositionInsideTable_ReturnsTrue(int x, int y)
    {
        var table = Table.Create(5, 5);

        Assert.True(table.IsInBounds(new Position(x, y)));
    }

    [Theory]
    [InlineData(-1, 0)]
    [InlineData(0, -1)]
    [InlineData(5, 0)]
    [InlineData(0, 5)]
    public void IsInBounds_WithPositionOutsideTable_ReturnsFalse(int x, int y)
    {
        var table = Table.Create(5, 5);

        Assert.False(table.IsInBounds(new Position(x, y)));
    }
}
