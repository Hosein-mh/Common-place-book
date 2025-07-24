import React from "react";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { ScriptProvider } from "./contexts/ScriptContext";
import { MainLayout } from "./components/layout/MainLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";

function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <ScriptProvider>
          <MainLayout />
          <OfflineIndicator />
          <PWAInstallPrompt />
        </ScriptProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

export default App;