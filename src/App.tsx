import { useState, useEffect } from "react";
import "./App.css";
import { Weather } from "./view/Weather";
import { Layout } from "./Layout";

//import { LocationProvider } from "./contexts/LocationContext";

import { WeatherProvider } from "./contexts/WeatherContext";

function App() {
  return (
    <>
      <WeatherProvider>
        <Layout>
          <Weather />
        </Layout>
      </WeatherProvider>

      {/* <>
      <LocationProvider>
        <Layout>
          <Weather />
        </Layout>
      </LocationProvider>
    </> */}
    </>
  );
}

export default App;
