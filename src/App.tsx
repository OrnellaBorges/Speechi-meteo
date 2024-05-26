import React from "react";
import "./App.css";
import { Weather } from "./view/Weather";

function App() {
  return (
    <div className="App">
      <header className="App-header">Header</header>
      <main>
        <Weather />
      </main>
    </div>
  );
}

export default App;
