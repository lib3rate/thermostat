import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {
  setMode,
  increaseDesiredTemperature,
  decreaseDesiredTemperature,
  selectId,
  selectMode,
  selectCurrentIndoorTemperature,
  selectDesiredTemperature
} from '../Thermostat/thermostatSlice';

import { changeMode } from "../../helpers/helpers";

const useStyles = makeStyles((theme) => ({
  temperatureMain: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temperatureContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  temperatureDisplay: {
    display: 'flex',
    flexDirection: 'column',
  },
  currentTemperature: {
    margin: '1rem',
    fontSize: '4rem'
  },
  desiredTemperature: {
    margin: '1rem',
    fontSize: '2.5rem'
  }
}));

export default function Temperature(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const id = useSelector(selectId);
  const currentMode = useSelector(selectMode);
  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);
  const desiredTemperature = useSelector(selectDesiredTemperature);

  // let mode = null;

  // useEffect(() => {
  //   mode = assignAutoMode();
  // }, [currentMode, desiredTemperature]);

  function assignAutoMode() {
    let result = null;

    if (currentIndoorTemperature > desiredTemperature) {
      result = 'auto_cool';
    } else if (currentIndoorTemperature < desiredTemperature) {
      result = 'auto_heat';
    } else if (currentIndoorTemperature === desiredTemperature) {
      result = 'auto_standby';
    }

    return result;
  };

  function decreaseTemperature() {
    // Assign event listener to the button to change the mode only in Auto mode
    if (currentMode.includes('auto')) {
      changeThermostatMode();
    }
    dispatch(decreaseDesiredTemperature());
  }

  function increaseTemperature() {
    // Assign event listener to the button to change the mode only in Auto mode
    if (currentMode.includes('auto')) {
      changeThermostatMode();
    }
    dispatch(increaseDesiredTemperature());
  }

  async function changeThermostatMode() {
    const mode = assignAutoMode();
    console.log(mode);

    const response = await changeMode(id, mode);

    // Change mode in the state only if the request to the API succeeded
    if (response.state === mode) {
      dispatch(setMode(mode));
    } else {
      alert('Could not change thermostat mode');
    }
  };

  // Assign which auto mode type should be displayed
  function displayAutoType() {
    let type = '';

    if (currentMode === 'auto_cool') {
      type = 'Cooling';
    } else if (currentMode === 'auto_heat') {
      type = 'Heating';
    } else if (currentMode === 'auto_standby') {
      type = 'Stand-by';
    }

    return type;
  }

  return (
    <div className={classes.temperatureMain}>
      {/* <Thermometer /> */}
      <div className={classes.temperatureContainer}>
        <div className={classes.temperatureDisplay}>
          <span>Current temperature:</span>
          <span className={classes.currentTemperature}>{currentIndoorTemperature}°</span>
        </div>
        <div className={classes.temperatureDisplay}>
          <span>Desired temperature:</span>
          <div>
            <Fab
              size="small"
              color="primary"
              aria-label="decrease"
              onClick={decreaseTemperature}
            >
              <RemoveIcon />
            </Fab>
            <span className={classes.desiredTemperature}>{desiredTemperature}°</span>
            <Fab
              size="small"
              color="primary"
              aria-label="increase"
              onClick={increaseTemperature}
            >
              <AddIcon />
            </Fab>
          </div>
          <span>{displayAutoType()}</span>
        </div>
      </div>
    </div>
  );
}