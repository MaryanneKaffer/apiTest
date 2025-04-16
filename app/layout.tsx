import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx("min-h-screen bg-background font-sans antialiased", fontSans.variable,)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <main className="font-sans">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
