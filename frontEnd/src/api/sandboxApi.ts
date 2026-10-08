import type { Sandbox } from "../types/sandbox";
import { readErrorMessage } from "./errors";
import type {
  CreateSandboxParams,
  PlaceRobotParams,
  RobotActionParams,
  SandboxApiResponse,
} from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5299";

const SANDBOX_URL = `${API_BASE_URL}/api/v1/Sandbox`;

function mapResponseToSandbox(response: SandboxApiResponse): Sandbox {
  return {
    id: response.id,
    table: {
      width: response.table.width,
      height: response.table.height,
    },
    robot: {
      isPlaced: response.robot.isPlaced,
      x: response.robot.x,
      y: response.robot.y,
      facing: response.robot.facing as Sandbox["robot"]["facing"],
    },
    log: response.log ?? [],
  };
}

export async function getSandboxesApi(): Promise<Sandbox[]> {
  const response = await fetch(SANDBOX_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Failed to load sandboxes."),
    );
  }

  const data: SandboxApiResponse[] = await response.json();
  return data.map(mapResponseToSandbox);
}

export async function deleteSandboxApi(id: string): Promise<void> {
  const response = await fetch(`${SANDBOX_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Failed to delete sandbox."),
    );
  }
}

export async function createSandboxApi(
  params: CreateSandboxParams,
): Promise<Sandbox> {
  const response = await fetch(SANDBOX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Failed to create sandbox."),
    );
  }

  const data: SandboxApiResponse = await response.json();
  return mapResponseToSandbox(data);
}

export async function placeRobotApi(
  params: PlaceRobotParams,
): Promise<Sandbox> {
  const response = await fetch(`${SANDBOX_URL}/${params.sandboxId}/robot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      x: params.x,
      y: params.y,
      facing: params.facing,
    }),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Failed to place robot."));
  }

  const data: SandboxApiResponse = await response.json();
  return mapResponseToSandbox(data);
}

export async function moveRobotApi(
  params: RobotActionParams,
): Promise<Sandbox> {
  const response = await fetch(
    `${SANDBOX_URL}/${params.sandboxId}/robot/move`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Failed to move robot."));
  }

  const data: SandboxApiResponse = await response.json();
  return mapResponseToSandbox(data);
}

export async function turnRobotLeftApi(
  params: RobotActionParams,
): Promise<Sandbox> {
  const response = await fetch(
    `${SANDBOX_URL}/${params.sandboxId}/robot/left`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Failed to turn robot."));
  }

  const data: SandboxApiResponse = await response.json();
  return mapResponseToSandbox(data);
}

export async function turnRobotRightApi(
  params: RobotActionParams,
): Promise<Sandbox> {
  const response = await fetch(
    `${SANDBOX_URL}/${params.sandboxId}/robot/right`,
    { method: "POST" },
  );

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Failed to turn robot."));
  }

  const data: SandboxApiResponse = await response.json();
  return mapResponseToSandbox(data);
}
