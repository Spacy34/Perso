import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";

export const metadata: Metadata = {
  title: "Perso Life OS",
  description:
    "Système personnel pour piloter priorités, routines, finances et maison connectée.",
  applicationName: "Perso Life OS"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="app-shell">
          <Sidebar />
          <div className="main-area">
            <TopBar />
            <main className="content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
