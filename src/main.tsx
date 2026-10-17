import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { ThemeInitializer } from "./components/providers/ThemeInitializer";
import { queryClient } from "./lib/queryClient";
import { AuthInitializer } from "./components/providers/AuthInitializer";
import "./lib/fonts";
import "./index.css";
import { Toaster } from "./components/ui/Toaster";
import { WatchlistInitializer } from "./components/providers/WatchlistInitializer";
import { WalletInitializer } from "./components/providers/WalletInitializer";

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeInitializer />
      <AuthInitializer />
      <WatchlistInitializer />
      <WalletInitializer />
      <App />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);