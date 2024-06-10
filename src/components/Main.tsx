import React from "react";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="main"
      style={{ height: "100%", border: "3px solid green" }}
    >
      {children}
    </main>
  );
}
