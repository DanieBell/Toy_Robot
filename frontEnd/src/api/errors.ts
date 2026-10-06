import type { ErrorDetails } from "./types";

export async function readErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const problem: ErrorDetails = await response.json();

    if (problem.errors) {
      const messages = Object.values(problem.errors).flat();
      if (messages.length > 0) {
        return messages.join(" ");
      }
    }

    return problem.detail ?? problem.title ?? fallback;
  } catch {
    return fallback;
  }
}
