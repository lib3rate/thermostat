import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import {
  changeUnit,
  switchPower,
  changeMode,
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  increaseDesiredTemperature,
  decreaseDesiredTemperature,
  selectCurrentUnit,
  isTurnedOn,
  selectMode,
  selectCurrentIndoorTemperature,
  selectCurrentOutdoorTemperature,
  selectDesiredTemperature
} from './unitSlice';

import { fetchTemperature } from "../../helpers/helpers";

function Unit() {
  const dispatch = useDispatch();

  const currentUnit = useSelector(selectCurrentUnit);
  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);

  useEffect(async () => {
    const averageIndoorTemperature = await fetchTemperature('temperature-1');
    dispatch(setCurrentIndoorTemperature(averageIndoorTemperature));

    const averageOutdoorTemperature = await fetchTemperature('outdoor-1');
    dispatch(setCurrentOutdoorTemperature(averageOutdoorTemperature));
  }, []);

  return (
    <div>
      <div>
        {currentUnit} - Thermostat
      </div>
      <div>
        {currentIndoorTemperature}
      </div>
    </div>
  );
}

export default Unit;