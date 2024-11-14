import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import UserContextProvider from "@/utils/UserContext";
import { Sidebar } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContextProvider>
        {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        > */}
        <SidebarProvider>
          <AppSidebar/>
          <main>
            <SidebarTrigger className="md:hidden"/>
          {children}

          </main>
          </SidebarProvider>
        {/* </ThemeProvider> */}
        </UserContextProvider>
      </body>
    </html>
  );
}
