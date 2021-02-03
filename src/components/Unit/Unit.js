import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {
  changeUnit,
  switchPower,
  changeMode,
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  increaseDesiredTemperature,
  decreaseDesiredTemperature
} from './unitSlice';

import { fetchTemperature } from "../../helpers/helpers";

function Unit() {
  const dispatch = useDispatch();

  useEffect(async () => {
    const averageIndoorTemperature = await fetchTemperature('temperature-1');
    dispatch(setCurrentIndoorTemperature(averageIndoorTemperature));

    const averageOutdoorTemperature = await fetchTemperature('outdoor-1');
    dispatch(setCurrentOutdoorTemperature(averageOutdoorTemperature));
  }, []);

  return (
    <div className="App">
      Initial
      {/* {datapoints.map(datapoint => <div>datapoint.value</div>)} */}
    </div>
  );
}

export default Unit;