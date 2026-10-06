import { useMutation } from "@tanstack/react-query";
import { placeRobotApi } from "../api/sandboxApi";
import type { PlaceRobotParams } from "../api/types";

export function usePlaceRobot() {
  return useMutation({
    mutationFn: (params: PlaceRobotParams) => placeRobotApi(params),
  });
}
