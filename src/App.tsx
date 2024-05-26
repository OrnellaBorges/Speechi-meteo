import { useState, useEffect } from "react";
import "./App.css";
import { Weather } from "./view/Weather";
import { Layout } from "./Layout";

import { LocationProvider } from "./contexts/LocationContext";

function App() {
  return (
    <>
      <LocationProvider>
        <Layout>
          <Weather />
        </Layout>
      </LocationProvider>
    </>
  );
}

export default App;
