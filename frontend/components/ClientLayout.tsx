// components/ClientLayout.tsx
"use client";

import { Inter } from "next/font/google";

import { RecoilRoot } from "recoil";
import Appbar from "./AppBar";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <RecoilRoot>
      <div className={inter.className}>
        <Appbar />
        <div className="z-20 mt-20">
          {children}
        </div>
      </div>
    </RecoilRoot>
  );
}
