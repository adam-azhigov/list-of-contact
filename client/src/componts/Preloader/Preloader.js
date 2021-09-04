import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: "center",
    marginTop: "50px",
  },
}));

function Preloader(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />Идет загрузка...
    </div>
  );
}

export default Preloader;