using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ToyRobot.Domain;

namespace ToyRobot.Api.Contracts;

public class PlaceRobotRequest
{
    [Range(0, int.MaxValue, ErrorMessage = "X must be zero or greater.")]
    public int X { get; init; }

    [Range(0, int.MaxValue, ErrorMessage = "Y must be zero or greater.")]
    public int Y { get; init; }

    [Required]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Direction Facing { get; init; }
}
