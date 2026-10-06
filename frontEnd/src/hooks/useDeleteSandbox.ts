import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSandboxApi } from "../api/sandboxApi";
import { sandboxListQueryKey } from "./useSandboxList";

export function useDeleteSandbox() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSandboxApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sandboxListQueryKey });
    },
  });
}
