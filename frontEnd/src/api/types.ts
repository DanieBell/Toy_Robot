export interface CreateSandboxParams {
  tableWidth: number;
  tableHeight: number;
}

export interface PlaceRobotParams {
  sandboxId: string;
  x: number;
  y: number;
  facing: string;
}

export interface RobotActionParams {
  sandboxId: string;
}

export interface ErrorDetails {
  title?: string;
  detail?: string;
  errors?: Record<string, string[]>;
}

export interface SandboxApiResponse {
  id: string;
  table: {
    width: number;
    height: number;
  };
  robot: {
    isPlaced: boolean;
    x: number | null;
    y: number | null;
    facing: string | null;
  };
}
