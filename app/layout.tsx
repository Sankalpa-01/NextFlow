import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextFlow | AI-Powered Workflow Builder",
  description: "Build, automate, and deploy AI agents with a visual drag-and-drop canvas.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}