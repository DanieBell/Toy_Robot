import { useMutation } from "@tanstack/react-query";
import { createSandboxApi } from "../api/sandboxApi";
import type { CreateSandboxParams } from "../api/types";

export function useCreateSandbox() {
  return useMutation({
    mutationFn: (params: CreateSandboxParams) => createSandboxApi(params),
  });
}
