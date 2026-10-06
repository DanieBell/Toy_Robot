import type { Robot } from "../types/sandbox";

export function formatReport(robot: Robot): string {
  return `X: ${robot.x}, Y: ${robot.y}, Facing: ${robot.facing?.toUpperCase()}`;
}
