"use client";

import { useEffect } from "react";

export function DisableErrorOverlay() {
  useEffect(() => {
    // This will disable the error overlay in development
    if (process.env.NODE_ENV === "development") {
      window.addEventListener("error", (e) => {
        if (e.message.includes("Hydration") || e.message.includes("hydration")) {
          e.stopImmediatePropagation();
        }
      });
      
      // Also disable console errors for hydration issues
      const originalConsoleError = console.error;
      console.error = (...args) => {
        if (
          typeof args[0] === "string" &&
          (args[0].includes("Hydration") || args[0].includes("hydration"))
        ) {
          return;
        }
        originalConsoleError(...args);
      };
    }
  }, []);

  return null;
} 