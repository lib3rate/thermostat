import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import store from '../../app/store';
import { makeStyles } from '@material-ui/core/styles';

import ModeButton from "../Buttons/ModeButton";
import Temperature from "../Temperature/Temperature";

import {
  registerThermostat,
  setMode,
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
import { setAlertOpen, setAlertMessage } from '../Alert/alertSlice';

import { register, fetchTemperature, fetchCurrentStatus } from "../../helpers/helpers";

const useStyles = makeStyles((theme) => ({
  unitTitle: {
    color: '#092652',
    fontSize: '1.125rem',
    fontWeight: 700
  },
  modeInterface: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
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

      if (response.uid_hash) {
        const id = response.uid_hash;
        dispatch(registerThermostat(id));
        localStorage.setItem('id', id);
      } else {
        dispatch(setAlertMessage('Could not register thermostat'));
        dispatch(setAlertOpen(true));
      }
    }

    // Save the thermostat id in the state if it is stored locally but not in the state
    if (!thermostatId) {
      dispatch(registerThermostat(localStorageId))
    };

    loadStatus();

    const averageIndoorTemperature = await fetchTemperature('temperature-1');

    if (averageIndoorTemperature) {
      dispatch(setCurrentIndoorTemperature(averageIndoorTemperature));
      dispatch(setDesiredTemperature(averageIndoorTemperature));
    } else {
      dispatch(setAlertMessage('Could not receive indoor temperature data'));
      dispatch(setAlertOpen(true));
    }

    const averageOutdoorTemperature = await fetchTemperature('outdoor-1');

    if (averageOutdoorTemperature) {
      dispatch(setCurrentOutdoorTemperature(averageOutdoorTemperature));
    } else {
      dispatch(setAlertMessage('Could not receive outdoor temperature data'));
      dispatch(setAlertOpen(true));
    }   

    // Update the current temperature every 5 minutes
    setInterval(async () => {
      let updatedIndoorTemperature = await fetchTemperature('temperature-1');
      dispatch(setCurrentIndoorTemperature(updatedIndoorTemperature));
    }, 300000);
  }, []);

  const currentUnit = useSelector(selectCurrentUnit);
  const currentMode = useSelector(selectMode);

  async function loadStatus() {
    // Get the thermostat id from the store after opening browser as Redux selector still has the old state data with null id
    const updatedId = store.getState().thermostat.id;
    const currentStatus = await fetchCurrentStatus(updatedId);

    if (currentStatus) {
      const registeredMode = currentStatus.state;
      dispatch(setMode(registeredMode));
    } else {
      dispatch(setAlertMessage('Could not receive current thermostat mode'));
      dispatch(setAlertOpen(true));
    }
  }

  function isTurnedOff() {
    return currentMode === 'off' ? true : false;
  };

  const buttons = ['Auto', 'Cooling', 'Heating'];

  return (
    <div>
      <div>
        <span className={classes.unitTitle}>{currentUnit} - Thermostat</span>
      </div>
      <ModeButton
        text='Turn off'
        isDisabled={isTurnedOff()}
      />
      <div className={classes.modeInterface}>
        <Temperature />
        <div className={classes.modeButtons}>
          Thermostat mode
          {buttons.map(button => (
            <ModeButton
              key={button}
              text={button}
              isDisabled={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}