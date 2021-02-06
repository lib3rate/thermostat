import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { changeDrawerUnit, selectCurrentUnit } from './navigationSlice';
import { changeThermostatUnit } from '../Thermostat/thermostatSlice';

const useStyles = makeStyles((theme) => ({
  unitText: {
    color: '#092652',
    fontWeight: 700
  }
}));

export default function NavigationItem(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const currentUnit = useSelector(selectCurrentUnit);

  const changeUnit = unit => {
    dispatch(changeDrawerUnit(unit));
    dispatch(changeThermostatUnit(unit));
  };

  function checkIfSelected() {
    return props.unit === currentUnit ? true : false;
  }

  return (
    <ListItem
      button
      onClick={() => changeUnit(props.unit)}
      selected={checkIfSelected()}
    >
      <ListItemText
        primary={props.unit}
        disableTypography={true}
        className={classes.unitText}
      />
    </ListItem>
  );
}