import React from "react";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { ScriptProvider } from "./contexts/ScriptContext";
import { MainLayout } from "./Components/layout/MainLayout";
import ErrorBoundary from "./Components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <ScriptProvider>
          <MainLayout />
          {/* <OfflineIndicator />
          <PWAInstallPrompt /> */}
        </ScriptProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

export default App;

