import React from "react";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="main"
      style={{ flex: "1 1 auto", border: "4px solid green", overflow: "auto" }}
    >
      {children}
    </main>
  );
}
