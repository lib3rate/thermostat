import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import {
  setMode,
  selectId,
  selectMode,
  selectCurrentIndoorTemperature,
  selectDesiredTemperature
} from '../Thermostat/thermostatSlice';

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
    background: "blue"
  },
  modeButtonText: {
    color: "blue"
  },
  powerButtonText: {
    color: "red"
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
  const desiredTemperature = useSelector(selectDesiredTemperature);

  // let mode = null;

  // if (props.text === 'Turn off') {
  //   mode = 'off';
  // } else if (props.text === 'Heating') {
  //   mode = 'heat';
  // } else if (props.text === 'Cooling') {
  //   mode = 'cool';
  // } else if (props.text === 'Auto') {
  //   if (currentIndoorTemperature > desiredTemperature) {
  //     mode = 'auto_cool';
  //   } else if (desiredTemperature > currentIndoorTemperature) {
  //     mode = 'auto_heat';
  //   } else if (desiredTemperature === currentIndoorTemperature) {
  //     mode = 'auto_standby';
  //   }
  // }

  function assignButtonMode() {
    if (props.text === 'Turn off') {
      return 'off';
    } else if (props.text === 'Heating') {
      return 'heat';
    } else if (props.text === 'Cooling') {
      return 'cool';
    } else if (props.text === 'Auto') {
      if (currentIndoorTemperature > desiredTemperature) {
        return 'auto_cool';
      } else if (currentIndoorTemperature > desiredTemperature) {
        return 'auto_heat';
      } else if (currentIndoorTemperature === desiredTemperature) {
        return 'auto_standby';
      }
    }
  };

  const mode = assignButtonMode();

  async function changeThermostatMode() {
    const response = await changeMode(id, mode);

    // Change mode in the state only if the request to the API succeeded
    if (response.state === mode) {
      dispatch(setMode(mode));
    } else {
      alert('Could not change thermostat mode');
    }
  };

  function selectButtonStyle() {
    if (props.text === 'Turn off') {
      return classes.powerButton;
    } else if (props.text === 'Cooling' && mode === currentMode) {
      return classes.selected;
    } else if (props.text === 'Heating' && mode === currentMode) {
      return classes.selected;
    } else if (props.text === 'Auto' && currentMode.includes('auto')) {
    // } else if (props.text === 'Auto' && (currentMode === 'auto_cool' || currentMode === 'auto_heat' || currentMode === 'auto_standby')) {
      return classes.selected;
    } else {
      return classes.modeButton;
    }
    
    // if (props.text === 'Turn off') {
    //   return classes.powerButton;
    // } else if (mode === currentMode) {
    //   return classes.selectedMode;
    // } else {
    //   return classes.modeButton;
    // }
  };

  function selectTextStyle() {
    if (props.text === 'Turn off') {
      return classes.powerButtonText;
    } else if (props.text === 'Cooling' && mode === currentMode) {
      return classes.selectedText;
    } else if (props.text === 'Heating' && mode === currentMode) {
      return classes.selectedText;
    } else if (props.text === 'Auto' && currentMode.includes('auto')) {
    // } else if (props.text === 'Auto' && (currentMode === 'auto_cool' || currentMode === 'auto_heat' || currentMode === 'auto_standby')) {
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