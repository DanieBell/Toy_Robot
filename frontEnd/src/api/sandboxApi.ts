import type { Sandbox } from "../types/sandbox";

const API_BASE_URL = "http://localhost:5299";

interface CreateSandboxParams {
  tableWidth: number;
  tableHeight: number;
}

interface SandboxApiResponse {
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
  };
}

export async function createSandboxApi(
  params: CreateSandboxParams,
): Promise<Sandbox> {
  const response = await fetch(`${API_BASE_URL}/api/Sandbox`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to create sandbox: ${response.status} ${errorBody}`,
    );
  }

  const data: SandboxApiResponse = await response.json();
  return mapResponseToSandbox(data);
}
