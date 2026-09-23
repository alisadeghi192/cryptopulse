import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./lib/fonts";
import "./index.css";
import { ThemeInitializer } from "./components/providers/ThemeInitializer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeInitializer />
    <App />
  </StrictMode>,
);
