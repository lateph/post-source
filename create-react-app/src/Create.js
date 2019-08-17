import React, { Component } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import AuthContext from '../context/auth-context';
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Topbar from '../components/Topbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import { emphasize } from '@material-ui/core/styles';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Editor } from 'react-draft-wysiwyg';
import { InputLabel } from '@material-ui/core';
import Autocomplete from './components/Autocomplete'
import FormHelperText from '@material-ui/core/FormHelperText';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AttachFile from '@material-ui/icons/AttachFile';
import AmiLargeHeader from './components/header';
import { connect } from 'react-redux'
import { sourceActions } from './_actions';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom';

// import stateFromHrml from 'draft-js-import-html'
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    // padding: 20,
    paddingBottom: 500,
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(6),
      // padding: theme.spacing(3),
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
  buttonProgress: {
    marginRight:  theme.spacing(1)
  },
  file: {
    display: 'none'
  }
})

class AuthPage extends Component {
  state = {
    _id:"",
    isLogin: true,
    title: "",
    shortDesc: "",
    desc: "",
    type: "",
    thumbUrl: "",
    thumbName: "",
    fileUrl: "",
    fileName: "",
    category: "Free",
    isLoading: false,
    editorState: EditorState.createEmpty(),
    tags: [],
    file: null,
    thumb: null,
    update: false,
    uploadProgress: {
      state: "",
      percentage: 0
    },
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

//   static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.setTags = this.setTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onThumbsAdded = this.onThumbsAdded.bind(this)
  }

  componentDidMount() {
    if(this.props.match && this.props.match.params && this.props.match.params.slug){
      this.props.getSlug(this.props.match.params.slug).then(ad => {
        const blocksFromHTML = convertFromHTML(ad.desc)
        const content = ContentState.createFromBlockArray(blocksFromHTML)
        this.setState({
          title: ad.title,
          _id: ad._id,
          desc: ad.desc,
          shortDesc: ad.shortDesc,
          type: ad.type._id,
          category: ad.category,
          thumbUrl: ad.thumbUrl,
          thumbName: ad.thumb,
          fileUrl: ad.fileUrl,
          fileName: ad.file,
          update: true,
          tags: ad.tags.map(t => {
            return {
              label: t.name,
              value: t._id
            }
          }),
          editorState: EditorState.createWithContent(content)
        })
      })
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  submitHandler = event => {
    event.preventDefault();

    this.props.create(this.state)
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  sendRequest(file, id, field) {
    return new Promise((resolve, reject) => {
     const req = new XMLHttpRequest();
   
     req.upload.addEventListener("progress", event => {
      if (event.lengthComputable) {
       const copy = { ...this.state.uploadProgress };
       copy[file.name] = {
        state: "pending",
        percentage: (event.loaded / event.total) * 100
       };
       this.setState({ uploadProgress: copy });
      }
     });
      
     req.upload.addEventListener("load", event => {
      const copy = { ...this.state.uploadProgress };
      copy[file.name] = { state: "done", percentage: 100 };
      this.setState({ uploadProgress: copy });
      resolve(req.response);
     });
      
     req.upload.addEventListener("error", event => {
      const copy = { ...this.state.uploadProgress };
      copy[file.name] = { state: "error", percentage: 0 };
      this.setState({ uploadProgress: copy });
      reject(req.response);
     });
   
     const formData = new FormData();
     formData.append("file", file, file.name);
     formData.append("id", id);
     formData.append("field", field);
    
     let jwt = localStorage.getItem('token');
     req.open("POST", process.env.REACT_APP_URL_UPLOAD);
     req.setRequestHeader('Authorization',  `Bearer ${jwt}`);
     req.send(formData);
    });
  }

  onFilesAdded(file) {
    this.setState({file: file.target.files[0]});
  }

  onThumbsAdded(file) {
    this.setState({thumb: file.target.files[0]});
  }

  setTags(values){
    this.setState({tags: values});
  }

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    // const message = {}
    const message = this.props.errors
    
    return (
      this.props.loggedIn === false ?  <Redirect to="/login"/> :
      <React.Fragment>
        <CssBaseline />
        <AmiLargeHeader />
        <div className={classes.root}>
          <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
                { this.state.update && this.props.loggedIn && this.props.user.userId === this.state._id && "Update Article"}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                      required
                      id="title"
                      name="title"
                      label="Title"
                      value={this.state.title}
                      onChange={ this.handleChange } 
                      error={ !!message.title }
                      helperText={ !!message.title ? message.title.message : "" }
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
                    value={this.state.shortDesc}
                    onChange={ this.handleChange } 
                    error={ !!message.shortDesc }
                    helperText={ !!message.shortDesc ? message.shortDesc.message : "" }
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
                    {!!message.desc && <p>Error</p>}
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
                          value="Paid"
                          control={<Radio color="primary" />}
                          label="Paid"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth error={ !!message.type }>
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
                        error={ !!message.type }
                        >
                        {this.props.types.map(t => (
                          <MenuItem key={t._id} value={t._id}>
                            {t.name}
                          </MenuItem>
                        ))}
                    </Select>
                    { !!message.type && <FormHelperText>{ message.type.message }</FormHelperText>}
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete options={this.props.tags} onChange={this.setTags} valuex={this.state.tags}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="file"
                    name="file"
                    label="Source Code File"
                    value={this.state.file ? this.state.file.name : ''}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <input
                            className={classes.file}
                            id="icon-button-file"
                            onChange={this.onFilesAdded}
                            type="file"
                          />
                          <label htmlFor="icon-button-file">
                              <IconButton color="primary" component="span">
                                  <AttachFile />
                              </IconButton>
                          </label>
                        </InputAdornment>
                      ),
                    }}
                  />
                  { this.state.update && <Button href={this.state.fileUrl} color="secondary">
                    {this.state.fileName}
                    <Icon style={{marginLeft: "5px"}}>cloud_download</Icon>
                  </Button> }
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="thumb"
                    name="thumb"
                    label="Thumb Image"
                    value={this.state.thumb ? this.state.thumb.name : ''}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <input
                            accept="image/*"
                            className={classes.file}
                            id="icon-button-photo"
                            onChange={this.onThumbsAdded}
                            type="file"
                          />
                          <label htmlFor="icon-button-photo">
                              <IconButton color="primary" component="span">
                                  <PhotoCamera />
                              </IconButton>
                          </label>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {  this.state.update && <img src={this.state.thumbUrl} style={{maxHeight: '100px', maxWidth: '200px', marginTop: '10px'}} alt=""/> }
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button className={classes.button} color="primary" variant="contained" onClick={event => this.submitHandler(event)} disabled={this.props.loading} >
                  {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} color="secondary" />}
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


function mapState(state) {
  const { loggedIn, user } = state.authentication;
  return { 
      types: state.types.items,
      tags: state.tags.items,
      loading: state.sources.loading,
      errors: state.sources.errors,
      source: state.sources.source,
      source: state.sources.source,
      loggedIn,
      user
  };
}

const actionCreators = {
  create: sourceActions.create,
  getSlug: sourceActions.getSlug,
};

const connectedLoginPage = connect(mapState, actionCreators)(AuthPage);

export default withRouter(withStyles(styles)(connectedLoginPage));
