import { useState, useEffect } from "react";
import "./App.css";
import { Weather } from "./view/Weather";
import { Layout } from "./Layout";
import { useClientLocation } from "./hooks/useClientLocation";

function App() {
  const { clientCoords, error } = useClientLocation();

  return (
    <>
      <Layout>
        <Weather clientCoords={clientCoords} />
      </Layout>
    </>
  );
}

export default App;
