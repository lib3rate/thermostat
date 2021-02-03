import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

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

export default function PowerButton(props) {
  const dispatch = useDispatch();

  const isTurnedOn = useSelector(selectPower);

  function powerMode() {
    return isTurnedOn ? 'Turn off' : 'Turn on';
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => dispatch(switchPower())}
    >
      {powerMode()}
    </Button>
  );
}