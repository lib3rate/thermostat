import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import {
  switchPower,
  // setCurrentIndoorTemperature,
  // setCurrentOutdoorTemperature,
  // increaseDesiredTemperature,
  // decreaseDesiredTemperature,
  // selectCurrentUnit,
  selectPower,
  // selectMode,
  // selectCurrentIndoorTemperature,
  // selectCurrentOutdoorTemperature,
  // selectDesiredTemperature
} from '../Unit/unitSlice';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '1rem 0 3rem 0',
    width: '8rem',
    background: "white"
  },
  text: {
    color: "red"
  },
}));

export default function PowerButton(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const isTurnedOn = useSelector(selectPower);

  function powerMode() {
    return isTurnedOn ? 'Turn off' : 'Turn on';
  }

  return (
    <Button
      variant="contained"
      onClick={() => dispatch(switchPower())}
      className={classes.button}
    >
      <span className={classes.text}>
        {powerMode()}
      </span>
    </Button>
  );
}