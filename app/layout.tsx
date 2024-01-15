import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import QueryProviders from "@/components/providers/query-provider";

const ibmPlexSans = IBM_Plex_Sans({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Админка",
  description: "Для бизнес админка",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ibmPlexSans.className
        )}
      >
        <QueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
