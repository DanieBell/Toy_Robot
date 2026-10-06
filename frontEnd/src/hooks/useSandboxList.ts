import { useQuery } from "@tanstack/react-query";
import { getSandboxesApi } from "../api/sandboxApi";

export const sandboxListQueryKey = ["sandboxes"] as const;

export function useSandboxList() {
  return useQuery({
    queryKey: sandboxListQueryKey,
    queryFn: getSandboxesApi,
  });
}
