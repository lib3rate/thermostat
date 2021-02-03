import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import PowerButton from "../Buttons/PowerButton";
import ModeButton from "../Buttons/ModeButton";

import {
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  // increaseDesiredTemperature,
  // decreaseDesiredTemperature,
  selectCurrentUnit,
  // selectPower,
  // selectMode,
  selectCurrentIndoorTemperature,
  // selectCurrentOutdoorTemperature,
  // selectDesiredTemperature
} from './unitSlice';

import { fetchTemperature } from "../../helpers/helpers";

export default function Unit() {
  const dispatch = useDispatch();

  useEffect(async () => {
    const averageIndoorTemperature = await fetchTemperature('temperature-1');
    dispatch(setCurrentIndoorTemperature(averageIndoorTemperature));

    const averageOutdoorTemperature = await fetchTemperature('outdoor-1');
    dispatch(setCurrentOutdoorTemperature(averageOutdoorTemperature));
  }, []);

  const currentUnit = useSelector(selectCurrentUnit);
  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);

  const modes = ['Auto', 'Cooling', 'Heating', 'Ventilation'];

  return (
    <div>
      <div>
        {currentUnit} - Thermostat
      </div>
      <PowerButton/>
      <div>
        {currentIndoorTemperature}
      </div>
      <div>
        {modes.map(mode => (
          <ModeButton
            key={mode}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
}

// export default Unit;