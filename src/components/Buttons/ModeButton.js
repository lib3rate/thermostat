import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import {
  setMode,
  selectId,
  selectMode,
  selectCurrentIndoorTemperature,
  selectCurrentOutdoorTemperature,
  selectDesiredTemperature
} from '../Thermostat/thermostatSlice';
import { setAlertOpen, setAlertMessage } from '../Alert/alertSlice';

import { changeMode } from "../../helpers/helpers";

const useStyles = makeStyles((theme) => ({
  modeButton: {
    margin: '0.25rem 0',
    width: '12rem',
    background: "white"
  },
  powerButton: {
    margin: '1rem 0 3rem 0',
    width: '8rem',
    background: "white"
  },
  selected: {
    margin: '0.25rem 0',
    width: '12rem',
    background: "#37dbdb"
  },
  modeButtonText: {
    color: "#092652e"
  },
  powerButtonText: {
    color: "#d40d1d"
  },
  selectedText: {
    color: "white"
  }
}));

export default function ModeButton(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const id = useSelector(selectId);
  const currentMode = useSelector(selectMode);
  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);
  const currentOutdoorTemperature = useSelector(selectCurrentOutdoorTemperature);
  const desiredTemperature = useSelector(selectDesiredTemperature);

  function assignButtonMode() {
    let result = null;

    if (props.text === 'Turn off') {
      result = 'off';
    } else if (props.text === 'Heating') {
      result = 'heat';
    } else if (props.text === 'Cooling') {
      result = 'cool';
    } else if (props.text === 'Auto') {
      if (currentIndoorTemperature > desiredTemperature) {
        currentOutdoorTemperature < 0 ? result = 'auto_standby' : result = 'auto_cool';
      } else if (currentIndoorTemperature < desiredTemperature) {
        result = 'auto_heat';
      } else if (currentIndoorTemperature === desiredTemperature) {
        result = 'auto_standby';
      }
    }
    return result;
  };
  
  async function changeThermostatMode() {
    const mode = assignButtonMode();

    if (mode === 'cool' && currentOutdoorTemperature < 0) {
      dispatch(setAlertMessage(`Cannot set the mode to "Cooling" - it's below 0˚C outside!`));
      dispatch(setAlertOpen(true));
      return;
    }

    const response = await changeMode(id, mode);

    // Change mode in the state only if the request to the API succeeded
    if (response.state === mode) {
      dispatch(setMode(mode));
    } else {
      dispatch(setAlertMessage(`Could not change thermostat mode`));
      dispatch(setAlertOpen(true));
    }
  };

  function selectButtonStyle() {
    if (props.text === 'Turn off') {
      return classes.powerButton;
    } else if (props.text === 'Cooling' && currentMode === 'cool') {
      return classes.selected;
    } else if (props.text === 'Heating' && currentMode === 'heat') {
      return classes.selected;
    } else if (props.text === 'Auto' && currentMode.includes('auto')) {
      return classes.selected;
    } else {
      return classes.modeButton;
    }
  };

  function selectTextStyle() {
    if (props.text === 'Turn off') {
      return classes.powerButtonText;
    } else if (props.text === 'Cooling' && currentMode === 'cool') {
      return classes.selectedText;
    } else if (props.text === 'Heating' && currentMode === 'heat') {
      return classes.selectedText;
    } else if (props.text === 'Auto' && currentMode.includes('auto')) {
      return classes.selectedText;
    } else {
      return classes.modeButtonText;      
    }
  };

  return (
    <Button
      variant="contained"
      onClick={changeThermostatMode}
      className={selectButtonStyle()}
      disabled={props.isDisabled}
    >
      <span className={selectTextStyle()}>
        {props.text}
      </span>
    </Button>
  );
}