import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {
  selectCurrentIndoorTemperature,
  increaseDesiredTemperature,
  decreaseDesiredTemperature,
} from '../Thermostat/thermostatSlice';

const useStyles = makeStyles((theme) => ({
  temperatureContainer: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temperature: {
    margin: '1rem',
    fontSize: '4rem'
  }
}));

export default function Temperature(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);

  return (
    <div className={classes.temperatureContainer}>
      <Fab
        size="small"
        color="primary"
        aria-label="increase"
        onClick={() => dispatch(increaseDesiredTemperature())}
      >
        <AddIcon />
      </Fab>
      <span className={classes.temperature}>{currentIndoorTemperature}°</span>
      <Fab
        size="small"
        color="primary"
        aria-label="decrease"
        onClick={()=>dispatch(decreaseDesiredTemperature())}
      >
        <RemoveIcon />
      </Fab>
    </div>
  );
}