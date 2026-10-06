import type { Direction } from "../types/sandbox";
import { DIRECTIONS } from "../types/sandbox";

export interface ParsedPlaceCommand {
  x: number;
  y: number;
  facing: Direction;
}

export type ParsePlaceCommandResult =
  | { success: true; command: ParsedPlaceCommand }
  | { success: false; error: string };

const DIRECTION_LOOKUP: Record<string, Direction> = Object.fromEntries(
  DIRECTIONS.map((direction) => [direction.toUpperCase(), direction]),
);

const PLACE_PATTERN = /^PLACE\s+(\d+)\s*,\s*(\d+)\s*,\s*([A-Z]+)$/i;

export function parsePlaceCommand(input: string): ParsePlaceCommandResult {
  const trimmed = input.trim();
  const match = trimmed.match(PLACE_PATTERN);

  if (!match) {
    return {
      success: false,
      error: "Expected format: PLACE X,Y,DIRECTION (e.g. PLACE 1,2,NORTH)",
    };
  }

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
      x: Number(rawX),
      y: Number(rawY),
      facing,
    },
  };
}
