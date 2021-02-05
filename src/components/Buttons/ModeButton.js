import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { setMode, selectId, selectMode } from '../Thermostat/thermostatSlice';
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
  selectedMode: {
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
  selectedModeText: {
    color: "white"
  }
}));

export default function ModeButton(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const id = useSelector(selectId);
  const currentMode = useSelector(selectMode);

  async function changeThermostatMode() {
    let mode = null;

    if (props.mode === 'Turn off') {
      mode = 'off';
    } else if (props.mode === 'Heating') {
      mode = 'heat';
    } else if (props.mode === 'Cooling') {
      mode = 'cool';
    } else if (props.mode === 'Auto') {
      mode = 'auto_standby';
    // } else if (props.mode === 'Auto' && ) {
    //   mode = 'auto_heat';
    } else {
      mode = 'auto_cool';
    }

    const response = await changeMode(id, mode);

    if (response.state === mode) {
      dispatch(setMode(props.mode));
    } else {
      alert('Could not change thermostat mode');
    }
  };

  function selectButtonStyle() {
    if (props.mode === 'Turn off') {
      return classes.powerButton;
    } else if (props.mode === currentMode) {
      return classes.selectedMode;
    } else {
      return classes.modeButton;
    }
  };

  function selectTextStyle() {
    if (props.mode === 'Turn off') {
      return classes.powerButtonText;
    } else if (props.mode === currentMode) {
      return classes.selectedModeText;
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
        {props.mode}
      </span>
    </Button>
  );
}