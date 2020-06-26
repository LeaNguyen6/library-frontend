import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, Redirect } from "react-router-dom";
import AuthService from '../services/auth.service';
import { AuthContext } from '../contexts/Auth'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/" >
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    "textDecoration": "none",
    "color": "#3f51b5",
    "fontSize": "0.875rem",
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontWeight": "400",
    "lineHeight": "1.43",
    "letterSpacing": "0.01071em",
    "margin": "0"
  }
}));

export default function SignIn() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({})
  const classes = useStyles();
  useEffect(() => {
    const check = AuthService.currentUser();

    if (check) { setAuth(true); setUser(check.user) }
    else { setAuth(false) }

  }, [])
  let currUser = {};
  let submitForm = (event) => {
    //   event.preventDefault()

    //apiCaller('api/login','post',currUser)
    AuthService.login(currUser).then((res) => {
      console.log(res)
      setUser(res.user)
      setAuth(true)
      console.log(auth)
    },error => {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log('err',resMessage,error.response)
      })
    //     .catch(err => {
    //   console.log('err')
    //   console.log(err, err.data)
    // })
    

  }
  const handleInputChange = (event) => {
   // console.log(auth)
    // console.log(event.target)
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name == 'email') {
      currUser = { ...currUser, email: value }
      //  setUser({ ...user, email: value })
    }
    if (name == 'password') {
      currUser = { ...currUser, pass: value }

      //  setUser({ ...user, pass: value })
    }
    //console.log(user)
  }


  // if (auth === true) {
  //   return <Profile />
  //   // <Redirect
  //   //   to={{
  //   //     pathname: "/books",
  //   //   }}
  //   // />
  // }
  return (
    <AuthContext.Consumer>
      {({ changeLogin }) => {
        console.log(auth)
        if (auth === true) {
          changeLogin(true)
          return <Redirect to={{pathname:'/profile'}} />
        }
        return <Container component="main" maxWidth="xs">
          <CssBaseline />

          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
      </Typography>
            <form className={classes.form} noValidate >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleInputChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                //  type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitForm}
              >
                Sign In
        </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2" className={classes.link}>
                    Forgot password?
            </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2" className={classes.link}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      }}
    </AuthContext.Consumer>

  );
}