import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import ModeButton from "../Buttons/ModeButton";
import Temperature from "../Temperature/Temperature";

import {
  registerThermostat,
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  setDesiredTemperature,
  selectCurrentUnit,
  selectId,
  selectMode,
  // selectCurrentIndoorTemperature,
  // selectCurrentOutdoorTemperature,
  // selectDesiredTemperature
} from './thermostatSlice';

import { register, fetchTemperature } from "../../helpers/helpers";

const useStyles = makeStyles((theme) => ({
  modeInterface: {
    display: 'flex'
  },
  modeButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%'
  },
}));

export default function Thermostat() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const localStorageId = localStorage.getItem('id');
  const thermostatId = useSelector(selectId);

  useEffect(async () => {
    // Register thermostat if there is no thermostat id stored locally
    if (!localStorageId) {
      const response = await register();
      const id = response.uid_hash;

      dispatch(registerThermostat(id));
      localStorage.setItem('id', id);
    }

    // Save the thermostat id in the state if it is stored locally but not in the state
    if (!thermostatId) {
      dispatch(registerThermostat(localStorageId))
    };

    const averageIndoorTemperature = await fetchTemperature('temperature-1');
    dispatch(setCurrentIndoorTemperature(averageIndoorTemperature));
    dispatch(setDesiredTemperature(averageIndoorTemperature));

    const averageOutdoorTemperature = await fetchTemperature('outdoor-1');
    dispatch(setCurrentOutdoorTemperature(averageOutdoorTemperature));

  }, []);

  const currentUnit = useSelector(selectCurrentUnit);
  const currentMode = useSelector(selectMode);

  function isTurnedOff() {
    return currentMode === 'Turn off' ? true : false;
  };

  const modes = ['Auto', 'Cooling', 'Heating'];

  return (
    <div>
      <div>
        {currentUnit} - Thermostat
      </div>
      <ModeButton
        mode='Turn off'
        isDisabled={isTurnedOff()}
      />
      <div className={classes.modeInterface}>
        <Temperature />
        <div className={classes.modeButtons}>
          Thermostat mode
          {modes.map(mode => (
            <ModeButton
              key={mode}
              mode={mode}
              isDisabled={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}