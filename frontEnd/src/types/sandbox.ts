export type Direction = "North" | "East" | "South" | "West";

export interface Table {
  width: number;
  height: number;
}

export interface Robot {
  isPlaced: boolean;
  x: number | null;
  y: number | null;
  facing: Direction | null;
}

export interface Sandbox {
  id: string;
  table: Table;
  robot: Robot;
}
