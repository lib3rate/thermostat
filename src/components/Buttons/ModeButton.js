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
  // selectPower,
  selectMode,
  // selectCurrentIndoorTemperature,
  // selectCurrentOutdoorTemperature,
  // selectDesiredTemperature
} from '../Unit/unitSlice';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0.25rem 0',
    width: '12rem'
  },
}));

export default function ModeButton(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentMode = useSelector(selectMode);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => changeMode(props.mode)}
      className={classes.button}
    >
      {props.mode}
    </Button>
  );
}