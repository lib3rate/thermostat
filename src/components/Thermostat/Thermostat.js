import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import ModeButton from "../Buttons/ModeButton";
import Temperature from "../Temperature/Temperature";

import {
  setCurrentIndoorTemperature,
  setCurrentOutdoorTemperature,
  selectCurrentUnit,
  selectMode,
  // selectCurrentIndoorTemperature,
  // selectCurrentOutdoorTemperature,
  // selectDesiredTemperature
} from './thermostatSlice';

import { fetchTemperature } from "../../helpers/helpers";

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

  useEffect(async () => {
    const averageIndoorTemperature = await fetchTemperature('temperature-1');
    dispatch(setCurrentIndoorTemperature(averageIndoorTemperature));

    const averageOutdoorTemperature = await fetchTemperature('outdoor-1');
    dispatch(setCurrentOutdoorTemperature(averageOutdoorTemperature));
  }, []);

  const currentUnit = useSelector(selectCurrentUnit);
  // const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);
  const currentMode = useSelector(selectMode);

  function isTurnedOff() {
    return currentMode === 'Turn off' ? true : false;
  }

  const modes = ['Auto', 'Cooling', 'Heating', 'Ventilation'];

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
        {/* <div className={classes.temperature}>
          {currentIndoorTemperature}
        </div> */}
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