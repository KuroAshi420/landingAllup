import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
  textCenter: {
    textAlign: 'center'
  }
}));

export const Success = () => {

  const user = useSelector(state => state.authentification.user);

  const classes = useStyles();

  return (
    <div className={classes.textCenter}>
     <h1>Thank You For Your Submission</h1>
      <h3>Your code  : {user.enterprise.token}</h3>
      <p>You will receive an email when your submission is accepted </p>

    </div>
  );
};
