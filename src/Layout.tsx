import React from "react";
import { Main } from "./components/Main";
import Header from "./components/Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
