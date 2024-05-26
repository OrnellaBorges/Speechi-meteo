import React from "react";

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="main" style={{ height: "100vh", border: "3px solid red" }}>
      {children}
    </main>
  );
}
