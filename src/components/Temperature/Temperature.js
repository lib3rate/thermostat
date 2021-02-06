import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import store from '../../app/store';
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
  selectCurrentOutdoorTemperature,
  selectDesiredTemperature
} from '../Thermostat/thermostatSlice';
import { setAlertOpen, setAlertMessage } from '../Alert/alertSlice';

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
  },
  desiredTemperatureInterface: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function Temperature(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const id = useSelector(selectId);
  const currentMode = useSelector(selectMode);
  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);
  const currentOutdoorTemperature = useSelector(selectCurrentOutdoorTemperature);
  const desiredTemperature = useSelector(selectDesiredTemperature);

  function decreaseTemperature() {
    dispatch(decreaseDesiredTemperature());
    
    // Assign event listener to the button to change the mode only in Auto mode
    if (currentMode.includes('auto')) {
      changeThermostatMode();
    }
  }

  function increaseTemperature() {
    dispatch(increaseDesiredTemperature());
    
    // Assign event listener to the button to change the mode only in Auto mode
    if (currentMode.includes('auto')) {
      changeThermostatMode();
    }
  }

  async function changeThermostatMode() {
    let mode = null;

    // Get the updated temperature from the store as Redux selector still has the old state data
    const updatedCurrentTemperature = store.getState().thermostat.currentIndoorTemperature;
    const updatedOutdoorTemperature = store.getState().thermostat.currentOutdoorTemperature;
    const updatedDesiredTemperature = store.getState().thermostat.desiredTemperature;

    if (updatedCurrentTemperature > updatedDesiredTemperature) {
      updatedOutdoorTemperature < 0 ? mode = 'auto_standby' : mode = 'auto_cool';
    } else if (updatedCurrentTemperature < updatedDesiredTemperature) {
      mode = 'auto_heat';
    } else if (updatedCurrentTemperature === updatedDesiredTemperature) {
      mode = 'auto_standby';
    }

    const response = await changeMode(id, mode);

    // Change mode in the state only if the request to the API succeeded
    if (response.state === mode) {
      dispatch(setMode(mode));
    } else {
      dispatch(setAlertMessage('Could not change thermostat mode'));
      dispatch(setAlertOpen(true));
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
      <div className={classes.temperatureContainer}>
        <div className={classes.temperatureDisplay}>
          <span>Current temperature:</span>
          <span className={classes.currentTemperature}>{currentIndoorTemperature}°</span>
        </div>
        <div className={classes.temperatureDisplay}>
          <span>Desired temperature:</span>
          <div className={classes.desiredTemperatureInterface}>
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