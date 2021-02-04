import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { selectCurrentIndoorTemperature } from '../Thermostat/thermostatSlice';

const useStyles = makeStyles((theme) => ({
  temperature: {
    width: '50%'
  },
}));

export default function Temperature(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);

  return (
    <div className={classes.temperature}>
      {currentIndoorTemperature}
    </div>
  );
}