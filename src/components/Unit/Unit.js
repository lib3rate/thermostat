import React, { useEffect } from "react";

import initialCall from "../../helpers/helpers";

function Unit() {
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

export default Unit;