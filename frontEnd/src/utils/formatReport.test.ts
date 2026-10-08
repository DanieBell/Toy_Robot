import { describe, expect, it } from "vitest";
import type { Robot } from "../types/sandbox";
import { formatReport } from "./formatReport";

describe("formatReport", () => {
  it("formats a placed robot with uppercased facing", () => {
    const robot: Robot = { isPlaced: true, x: 2, y: 0, facing: "East" };

    expect(formatReport(robot)).toBe("X: 2, Y: 0, Facing: EAST");
  });

  it("includes zero coordinates", () => {
    const robot: Robot = { isPlaced: true, x: 0, y: 0, facing: "North" };

    expect(formatReport(robot)).toBe("X: 0, Y: 0, Facing: NORTH");
  });
});
