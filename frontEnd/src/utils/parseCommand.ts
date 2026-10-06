import type { Direction } from "../types/sandbox";
import { DIRECTIONS } from "../types/sandbox";

export type ParsedCommand =
  | { type: "place"; x: number; y: number; facing: Direction }
  | { type: "move" }
  | { type: "left" }
  | { type: "right" }
  | { type: "report" };

export type ParseCommandResult =
  | { success: true; command: ParsedCommand }
  | { success: false; error: string };

const DIRECTION_LOOKUP: Record<string, Direction> = Object.fromEntries(
  DIRECTIONS.map((direction) => [direction.toUpperCase(), direction]),
);

const PLACE_PATTERN = /^PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*([A-Z]+)$/i;

export function parseCommand(input: string): ParseCommandResult {
  const trimmed = input.trim();
  const keyword = trimmed.toUpperCase();

  if (keyword === "MOVE") {
    return { success: true, command: { type: "move" } };
  }

  if (keyword === "LEFT") {
    return { success: true, command: { type: "left" } };
  }

  if (keyword === "RIGHT") {
    return { success: true, command: { type: "right" } };
  }

  if (keyword === "REPORT") {
    return { success: true, command: { type: "report" } };
  }

  const match = trimmed.match(PLACE_PATTERN);

  if (match) {
    const [, rawX, rawY, rawFacing] = match;
    const facing = DIRECTION_LOOKUP[rawFacing.toUpperCase()];

    if (!facing) {
      return {
        success: false,
        error: "Direction must be one of NORTH, EAST, SOUTH, WEST.",
      };
    }

    return {
      success: true,
      command: {
        type: "place",
        x: Number(rawX),
        y: Number(rawY),
        facing,
      },
    };
  }

  return {
    success: false,
    error:
      "Unknown command. Try PLACE X,Y,DIRECTION, MOVE, LEFT, RIGHT, or REPORT.",
  };
}
