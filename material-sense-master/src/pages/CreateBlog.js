import React, { Component } from 'react';

import './Auth.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import AuthContext from '../context/auth-context';
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Topbar from '../components/Topbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { emphasize } from '@material-ui/core/styles';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Editor } from 'react-draft-wysiwyg';
import { InputLabel } from '@material-ui/core';
import Autocomplete from '../components/Autocomplete'
import fetcher from '../api';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    title: "",
    shortDesc: "",
    desc: "",
    type: "",
    category: "Free",
    isLoading: false,
    editorState: EditorState.createEmpty(),
    tags: [],
    formValidation: {
      title: "",
      shortDesc: "",
      desc: "",
      category: "",
      type: "",
      tags: ""
    },
    _types: [],
    _tags: [],
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.setTags = this.setTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.fetchDatas();
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  submitHandler = event => {
    event.preventDefault();

    const {title, shortDesc, desc, category, type, tags} = this.state;

    let requestBody = {
      query: `
      mutation Source($title: String, $shortDesc: String , $desc: String , $category: String , $type: String, $tags: [String!]) {
          createSource(input: {title: $title, shortDesc: $shortDesc , desc: $desc , category: $category , type: $type, tags: $tags}) {
            errors {
              title
              shortDesc
              desc
              category
              type
              tags
            }
            source{
              _id
            }
          }
        }
      `,
      variables: {
        title: title,
        shortDesc: shortDesc,
        desc: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        category: category,
        type: type,
        tags: tags.map(t => t.label)
      }
    };

    this.setState({isLoading: true});
    fetcher(requestBody)
      .then(resData => {
        console.log(resData)
        let errors = resData.data.createSource.errors
        console.log('errors', errors)
        if(errors !== null && errors){
          this.setState({
            isLoading: false, 
            formValidation: errors
          });
          console.log(this.state)
          return
        }
        this.setState({isLoading: false});
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  setTags(values){
    this.setState({tags: values});
  }

  fetchDatas() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          types{
            _id
            name
          }
          tags{
            _id
            name
          }
        }
        `
    };

    fetcher(requestBody)
      .then(resData => {
        console.log("type", resData)
        this.setState({ _types: resData.data.types, _tags: resData.data.tags });

        // const events = resData.data.events;
        // if (this.isActive) {
        //   this.setState({ events: events, isLoading: false });
        // }
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
                        onChange={ this.handleChange } 
                        error={ !!this.state.formValidation.title }
                        helperText={ !!this.state.formValidation.title ? this.state.formValidation.title.join(',') : "" }
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
                    onChange={ this.handleChange } 
                    error={ !!this.state.formValidation.shortDesc }
                    helperText={ !!this.state.formValidation.shortDesc ? this.state.formValidation.shortDesc.join(',') : "" }
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
                    {!!this.state.formValidation.desc && <p>Error</p>}
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
                      <RadioGroup aria-label="position" name="category" row onChange={this.handleChange} value={this.state.category}>
                        <FormControlLabel
                          value="Free"
                          control={<Radio color="primary" />}
                          label="Free"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Trial"
                          control={<Radio color="primary" />}
                          label="Trial"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="Buy"
                          control={<Radio color="primary" />}
                          label="Buy"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth error={ !!this.state.formValidation.type }>
                    <InputLabel>Type</InputLabel>
                    <Select
                        id="type"
                        name="type"
                        label="type"
                        value={this.state.type}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'type',
                            id: 'type',
                        }}
                        error={ !!this.state.formValidation.type }
                        >
                        {this.state._types.map(t => (
                          <MenuItem key={t._id} value={t._id}>
                            {t.name}
                          </MenuItem>
                        ))}
                    </Select>
                    { !!this.state.formValidation.type && <FormHelperText>{ this.state.formValidation.type.join(',') }</FormHelperText>}
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete options={this.state._tags} onChange={this.setTags}/>
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button className={classes.button} color="primary" variant="contained" onClick={event => this.submitHandler(event)}>
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
