import { useMutation } from "@tanstack/react-query";
import { moveRobotApi } from "../api/sandboxApi";
import type { RobotActionParams } from "../api/types";

export function useMoveRobot() {
  return useMutation({
    mutationFn: (params: RobotActionParams) => moveRobotApi(params),
  });
}
