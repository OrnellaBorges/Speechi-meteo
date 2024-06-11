import React from "react";
import { Main } from "./components/Main";
import Header from "./components/Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="layout"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "4px solid blue",
        padding: "0.8rem",
      }}
    >
      <Header />
      <Main>{children}</Main>
    </div>
  );
}
