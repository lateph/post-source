import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../context/auth-context';
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from '../components/Topbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
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

  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  submitHandler = event => {
    event.preventDefault();

    const {email, password, firstName, lastName} = this.state;

    var requestBody = {
      query: `
        mutation CreateUser($email: String, $password: String, $firstName: String, $lastName: String) {
          createUser(userInput: {email: $email, password: $password, firstName: $firstName, lastName: $lastName}) {
            errors {
              email
              password
              firstName
              lastName
            }
            auth {
              userId
              token
              tokenExpiration
            }
          }
        }
      `,
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }
    };

    this.setState({isLoading: true});
    fetch(process.env.REACT_APP_URL, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.setState({isLoading: false});
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        let errors = resData.data.createUser.errors
        console.log('errors', errors)
        if(errors !== null && errors){
          this.setState({
            isLoading: false, 
            formValidation: errors
          });
          return
        }
        this.setState({isLoading: false});

        let auth = resData.data.createUser.auth
        if (auth.token) {
          this.context.login(
            auth.token,
            auth.userId,
            auth.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const currentPath = this.props.location.pathname
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
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
                      error={ !!this.state.formValidation.firstName }
                      helperText={ !!this.state.formValidation.firstName ? this.state.formValidation.firstName.join(',') : "" }
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
                      error={ !!this.state.formValidation.lastName }
                      helperText={ !!this.state.formValidation.lastName ? this.state.formValidation.lastName.join(',') : "" }
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
                      error={ !!this.state.formValidation.email }
                      helperText={ !!this.state.formValidation.email ? this.state.formValidation.email.join(',') : "" }
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
                      error={ !!this.state.formValidation.password }
                      helperText={ !!this.state.formValidation.password ? this.state.formValidation.password.join(',') : "" }
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
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(AuthPage));
