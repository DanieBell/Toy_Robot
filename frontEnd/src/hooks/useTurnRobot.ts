import { useMutation } from "@tanstack/react-query";
import { turnRobotLeftApi, turnRobotRightApi } from "../api/sandboxApi";
import type { RobotActionParams } from "../api/types";

export function useTurnRobotLeft() {
  return useMutation({
    mutationFn: (params: RobotActionParams) => turnRobotLeftApi(params),
  });
}

export function useTurnRobotRight() {
  return useMutation({
    mutationFn: (params: RobotActionParams) => turnRobotRightApi(params),
  });
}
