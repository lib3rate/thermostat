import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {
  increaseDesiredTemperature,
  decreaseDesiredTemperature,
  selectCurrentIndoorTemperature,
  selectDesiredTemperature
} from '../Thermostat/thermostatSlice';

const useStyles = makeStyles((theme) => ({
  temperatureMain: {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  temperatureContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  temperatureDisplay: {
    display: 'flex',
    flexDirection: 'column',
  },
  currentTemperature: {
    margin: '1rem',
    fontSize: '4rem'
  },
  desiredTemperature: {
    margin: '1rem',
    fontSize: '2.5rem'
  }
}));

export default function Temperature(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentIndoorTemperature = useSelector(selectCurrentIndoorTemperature);
  const desiredTemperature = useSelector(selectDesiredTemperature);

  return (
    <div className={classes.temperatureMain}>
      {/* <Thermometer /> */}
      <div className={classes.temperatureContainer}>
        <div className={classes.temperatureDisplay}>
          <span>Current temperature:</span>
          <span className={classes.currentTemperature}>{currentIndoorTemperature}°</span>
        </div>
        <div className={classes.temperatureDisplay}>
          <span>Desired temperature:</span>
          <div>
            <Fab
              size="small"
              color="primary"
              aria-label="increase"
              onClick={() => dispatch(increaseDesiredTemperature())}
            >
              <AddIcon />
            </Fab>
            <span className={classes.desiredTemperature}>{desiredTemperature}°</span>
            <Fab
              size="small"
              color="primary"
              aria-label="decrease"
              onClick={()=>dispatch(decreaseDesiredTemperature())}
            >
              <RemoveIcon />
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
}