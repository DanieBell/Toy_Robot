import { useMutation } from "@tanstack/react-query";
import { createSandboxApi } from "../api/sandboxApi";

export function useCreateSandbox() {
  return useMutation({
    mutationFn: (params: { tableWidth: number; tableHeight: number }) =>
      createSandboxApi(params),
  });
}
