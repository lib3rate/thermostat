import React, { useEffect } from "react";
// import { Counter } from './features/counter/Counter';
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
      Initial
      {/* {datapoints.map(datapoint => <div>datapoint.value</div>)} */}
    </div>
  );
}

export default App;
