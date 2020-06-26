import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, ButtonBase } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AuthService from '../services/auth.service';
import { Redirect } from "react-router-dom";
import { AuthContext } from '../contexts/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
  image: {
    width: 250,
    height: 250,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
export default function Profile() {
  const classes = useStyles();
  const [user, setUser] = useState({})

  useEffect(() => {
    const check = AuthService.currentUser();

    if (check) { setUser(check.user) }

  }, [])
  if (user === {}) {
    return <Redirect
      to={{
        pathname: "/signin",
        // state: { from: location }
      }}
    />
  }
  return (
    <div className={classes.root}>
      <AuthContext.Consumer>
        {({ auth }) => {
          if (auth === false) {
            return <Redirect
              to={{
                pathname: "/signin",
              }}
            />
          }
          // else {return
         return <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={user.avatar} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="h6">
                          Profile
                  </Typography>
                        <Typography variant="body2" gutterBottom>
                          <span>Name : </span> {user.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <span>Email : </span> {user.email}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <span>Phone : </span> {user.phone}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

        }}
      </AuthContext.Consumer>

    </div>
  );
}
