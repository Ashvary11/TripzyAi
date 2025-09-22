import React from "react";
import { Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) { 
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Provider>{children}</Provider>
             */}
            {mounted ? <Provider>{children}</Provider> : null}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
