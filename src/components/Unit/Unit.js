import React, { useEffect } from "react";

import { fetchTemperature } from "../../helpers/helpers";

function Unit() {
  useEffect(async () => {
    const currentTemperatureData = await fetchTemperature('temperature-1');
    console.log(currentTemperatureData);
  }, []);

  // const datapoints = data.data_points;

  return (
    <div className="App">
      Initial
      {/* {datapoints.map(datapoint => <div>datapoint.value</div>)} */}
    </div>
  );
}

export default Unit;