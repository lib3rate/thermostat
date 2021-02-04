import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
  modeInterface: {
    display: 'flex'
  },
  temperature: {
    width: '50%'
  },
  modeButtons: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'
  },
}));

export default function Unit() {
  const dispatch = useDispatch();
  const classes = useStyles();

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
      <div className={classes.modeInterface}>
        <div className={classes.temperature}>
          {currentIndoorTemperature}
        </div>
        <div className={classes.modeButtons}>
          {modes.map(mode => (
            <ModeButton
              key={mode}
              mode={mode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}