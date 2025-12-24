// app/layout.tsx
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alpha Nodus",
  description: "Career Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
