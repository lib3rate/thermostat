import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { changeDrawerUnit, selectCurrentUnit } from './navigationSlice';
import { changeThermostatUnit } from '../Unit/unitSlice';

export default function NavigationItem(props) {
  const dispatch = useDispatch();

  const currentUnit = useSelector(selectCurrentUnit);

  const changeUnit = unit => {
    dispatch(changeDrawerUnit(unit));
    dispatch(changeThermostatUnit(unit));
  };

  function checkIfSelected() {
    // if (props.unit === currentUnit) {
    //   return true;
    // } else {
    //   return false;
    // }
    return props.unit === currentUnit ? true : false;
  }

  return (
    <ListItem
      button
      onClick={() => changeUnit(props.unit)}
      selected={checkIfSelected()}
    >
      <ListItemText primary={props.unit} />
    </ListItem>
  );
}

// export default NavigationItem;