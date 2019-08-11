import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import AmiLargeHeader from './components/header';
import { userActions } from './_actions';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  paper: {
    marginTop: theme.spacing(1),
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
})

class AuthPage extends Component {
  state = {
    isLogin: true,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    isLoading: false,
    formValidation: {
      email: "",
      lastName: "",
      firstName: "",
      password: ""
    }
  };


  constructor(props) {
    super(props);
  }

  submitHandler = event => {
    event.preventDefault();

    this.props.register(this.state);
  };

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const currentPath = this.props.location.pathname
    const { classes } = this.props;
    const message = this.props.message || {}

    return (
      <>
        <CssBaseline />
        <AmiLargeHeader />
        <div className={classes.root}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classes.form} noValidate  onSubmit={this.submitHandler}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      error={ !!message.firstName }
                      helperText={ !!message.firstName ? message.firstName.join(',') : "" }
                      onChange={ this.handleChange.bind(this) } 
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      error={ !!message.lastName }
                      helperText={ !!message.lastName ? message.lastName.join(',') : "" }
                      onChange={ this.handleChange.bind(this) } 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={ !!message.email }
                      helperText={ !!message.email ? message.email.join(',') : "" }
                      onChange={ this.handleChange.bind(this) } 
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={ !!message.password }
                      helperText={ !!message.password ? message.password.join(',') : "" }
                      onChange={ this.handleChange.bind(this) }
                  />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
              </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                        Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  const { message } = state.alert;
  return { loggingIn, message };
}

const actionCreators = {
  register: userActions.register
};

const connectedLoginPage = connect(mapState, actionCreators)(AuthPage);

export default withRouter(withStyles(styles)(connectedLoginPage));
