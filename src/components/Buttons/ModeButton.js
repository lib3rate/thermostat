import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import {
  changeMode,
  // setCurrentIndoorTemperature,
  // setCurrentOutdoorTemperature,
  // increaseDesiredTemperature,
  // decreaseDesiredTemperature,
  // selectCurrentUnit,
  selectMode,
  // selectCurrentIndoorTemperature,
  // selectCurrentOutdoorTemperature,
  // selectDesiredTemperature
} from '../Unit/unitSlice';

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

  const currentMode = useSelector(selectMode);

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
      onClick={() => dispatch(changeMode(props.mode))}
      className={selectButtonStyle()}
      disabled={props.isDisabled}
    >
      <span className={selectTextStyle()}>
        {props.mode}
      </span>
    </Button>
  );
}