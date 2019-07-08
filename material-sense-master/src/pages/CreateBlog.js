import React, { Component } from 'react';

import './Auth.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import AuthContext from '../context/auth-context';
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from '../components/Topbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import SelectR from 'react-select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { emphasize } from '@material-ui/core/styles';
import { EditorState } from 'draft-js';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Editor } from 'react-draft-wysiwyg';
import { InputLabel } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Autocomplete from '../components/Autocomplete'


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
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
})

class AuthPage extends Component {
  state = {
    isLogin: true,
    email: "",
    password: "",
    isLoading: false,
    editorState: EditorState.createEmpty()
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  submitHandler = event => {
    event.preventDefault();

    const {email, password} = this.state;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    this.setState({isLoading: true});
    fetch('http://localhost:8000/graphql', {
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
        this.setState({isLoading: false});
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
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

  fetchDatas() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            events {
              _id
              title
              description
              date
              price
              creator {
                _id
                email
              }
            }
          }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const events = resData.data.events;
        if (this.isActive) {
          this.setState({ events: events, isLoading: false });
        }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  render() {
    const currentPath = this.props.location.pathname
    const { classes } = this.props;
    const { editorState } = this.state;
    
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                Add Blog
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        autoComplete="fname"
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="shortDesc"
                    name="shortDesc"
                    label="Short Desc"
                    fullWidth
                    autoComplete="lname"
                />
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField
                        required
                        id="desc"
                        name="desc"
                        label="Desc"
                        fullWidth
                    /> */}
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="home-editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* <TextField
                        id="type"
                        name="type"
                        label="Type"
                        fullWidth
                    /> */}
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Category</FormLabel>
                      <RadioGroup aria-label="position" name="position" row>
                        <FormControlLabel
                          value="Free"
                          control={<Radio color="primary" />}
                          label="Top"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Trial"
                          control={<Radio color="primary" />}
                          label="Start"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Buy"
                          control={<Radio color="primary" />}
                          label="Bottom"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="end"
                          control={<Radio color="primary" />}
                          label="End"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            id="category"
                            name="category"
                            label="category"
                            inputProps={{
                                name: 'age',
                                id: 'age-simple',
                            }}
                            >
                            <MenuItem value={10}>Source Code</MenuItem>
                            <MenuItem value={20}>Application</MenuItem>
                            <MenuItem value={30}>eBook</MenuItem>
                            <MenuItem value={40}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete />
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button className={classes.button} color="primary" variant="contained">
                    Submit
                </Button>
            </div>
            </Paper>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(AuthPage));
