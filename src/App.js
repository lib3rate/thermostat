import React, { useEffect } from "react";
// import { Counter } from './features/counter/Counter';
import NavigationDrawer from "./components/NavigationDrawer";
import './App.css';

import initialCall from "./helpers/helpers";

function App() {
  useEffect(async () => {
    const data = await initialCall();
    console.log(data);
  }, []);

  // const datapoints = data.data_points;

  return (
    <div className="App">
      <NavigationDrawer/>
      {/* {datapoints.map(datapoint => <div>datapoint.value</div>)} */}
    </div>
  );
}

export default App;
