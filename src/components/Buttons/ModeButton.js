import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

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

export default function ModeButton(props) {
  const dispatch = useDispatch();

  const currentMode = useSelector(selectMode);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => changeMode(props.mode)}
    >
      {props.mode}
    </Button>
  );
}