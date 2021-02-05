import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
  setAlertOpen,
  setAlertMessage,
  checkIfOpen,
  selectAlertMessage
} from './alertSlice';

export default function Alert() {
  const dispatch = useDispatch();
  const isOpen = useSelector(checkIfOpen);
  const message = useSelector(selectAlertMessage);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setAlertOpen(false));
    dispatch(setAlertMessage(''));
  };

  return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          variant="filled"
          severity="error"
          onClose={handleClose}
        >
          {message}
        </MuiAlert>
      </Snackbar>
  );
}