import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute } from "@tanstack/react-router";
import { SandboxProvider } from "../context/SandboxContext";
import { MainLayout } from "../layouts/mainLayout";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <SandboxProvider>
        <MainLayout />
      </SandboxProvider>
    </QueryClientProvider>
  );
}
