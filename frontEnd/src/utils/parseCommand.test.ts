import { describe, expect, it } from "vitest";
import { parseCommand } from "./parseCommand";

describe("parseCommand", () => {
  it("parses a PLACE command with coordinates and direction", () => {
    const result = parseCommand("PLACE 1,2,NORTH");

    expect(result).toEqual({
      success: true,
      command: { type: "place", x: 1, y: 2, facing: "North" },
    });
  });

  it("is case-insensitive and tolerates whitespace", () => {
    const result = parseCommand("  place 3 , 4 , east  ");

    expect(result).toEqual({
      success: true,
      command: { type: "place", x: 3, y: 4, facing: "East" },
    });
  });

  it.each([
    ["MOVE", "move"],
    ["LEFT", "left"],
    ["RIGHT", "right"],
    ["REPORT", "report"],
  ])("parses the %s command", (input, type) => {
    const result = parseCommand(input);

    expect(result).toEqual({ success: true, command: { type } });
  });

  it("parses lowercase keyword commands", () => {
    expect(parseCommand("move")).toEqual({
      success: true,
      command: { type: "move" },
    });
  });

  it("rejects a PLACE command with an invalid direction", () => {
    const result = parseCommand("PLACE 1,2,UP");

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/NORTH, EAST, SOUTH, WEST/);
    }
  });

  it("rejects an unknown command", () => {
    const result = parseCommand("DANCE");

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toMatch(/Unknown command/);
    }
  });

  it("rejects a malformed PLACE command", () => {
    const result = parseCommand("PLACE 1,NORTH");

    expect(result.success).toBe(false);
  });
});
