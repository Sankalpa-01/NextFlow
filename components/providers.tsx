// "use client";

// import * as React from "react";
// import { ClerkProvider } from "@clerk/nextjs";
// import { ReactFlowProvider } from "@xyflow/react";
// import { Toaster } from "@/components/ui/sonner";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <ClerkProvider>
//       <NextThemesProvider
//         attribute="class"
//         defaultTheme="system"
//         enableSystem
//         disableTransitionOnChange
//       >
//         <ReactFlowProvider>
//           {children}
//           <Toaster position="bottom-right" richColors closeButton />
//         </ReactFlowProvider>
//       </NextThemesProvider>
//     </ClerkProvider>
//   );
// }

"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./theme-provider"; // 👈 Import your new wrapper
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  );
}