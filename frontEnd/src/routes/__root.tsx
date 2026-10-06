import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute } from "@tanstack/react-router";
import { SandboxProvider } from "../context/SandboxContext";
import { ToastProvider } from "../context/ToastContext";
import { MainLayout } from "../layouts/mainLayout";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <SandboxProvider>
          <MainLayout />
        </SandboxProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
