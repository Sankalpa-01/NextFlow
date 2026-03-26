"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ 
  children, 
  ...props 
}: React.ComponentProps<typeof NextThemesProvider>) {
  // ✅ FIX: Suppress the React 19 / Next.js 16.2 script warning
  // This script is required by next-themes to prevent flickering.
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        if (
          typeof args[0] === "string" && 
          args[0].includes("Encountered a script tag while rendering React component")
        ) {
          return;
        }
        originalError.apply(console, args);
      };
    }
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}