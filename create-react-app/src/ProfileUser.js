import React, { Component } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// import AuthContext from '../context/auth-context';
import { withRouter } from 'react-router-dom'
import withStyles from '@material-ui/styles/withStyles';
// import Topbar from '../components/Topbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import { emphasize } from '@material-ui/core/styles';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { connect } from 'react-redux'
import { userActions } from './_actions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Snackbar from '@material-ui/core/Snackbar';
// import stateFromHrml from 'draft-js-import-html'
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
  buttonProgress: {
    marginRight:  theme.spacing(1)
  },
  file: {
    display: 'none'
  }
})

class AuthPage extends Component {
  state = {
    open: false,
    _id:"",
    isLogin: true,
    firstName: "",
    lastName: "",
    email: "",
    type: "",
    thumbUrl: "",
    thumbName: "",
    fileUrl: "",
    fileName: "",
    isLoading: false,
    tags: [],
    file: null,
    thumb: null,
    update: false,
    uploadProgress: {
      state: "",
      percentage: 0
    },
    _types: [],
    _tags: [],
  };

//   static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.setTags = this.setTags.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.onFilesAdded = this.onFilesAdded.bind(this)
    this.onThumbsAdded = this.onThumbsAdded.bind(this)
  }

  handleClick() {
    this.setState({
      open: true
    })
  }

  handleClose(event, reason) {
    this.setState({
      open: false
    })
  }

  loadData(){
    this.props.getProfile().then(ad => {
      console.log("woke bos", ad)
      this.setState({
        firstName: ad.firstName,
        _id: ad._id,
        lastName: ad.lastName,
        email: ad.email,
        thumbUrl: ad.thumbUrl,
        thumbName: ad.thumb,
      })
    })
  }

  componentDidMount() {
    // if(this.props.match && this.props.match.params && this.props.match.params.slug){
    this.loadData()
    // }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  submitHandler = event => {
    event.preventDefault();

    this.props.updateProfile(this.state).then(e => {
      this.setState({
        open: true
      })
    })
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
    // const message = {}
    const message = this.props.errors
    
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="Title"
                  value={this.state.firstName}
                  onChange={ this.handleChange } 
                  error={ !!message.firstName }
                  helperText={ !!message.firstName ? message.firstName.message : "" }
                  fullWidth
                  autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Short Desc"
                  fullWidth
                  value={this.state.lastName}
                  onChange={ this.handleChange } 
                  error={ !!message.lastName }
                  helperText={ !!message.lastName ? message.lastName.message : "" }
                  autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  required
                  id="email"
                  name="email"
                  label="email"
                  fullWidth
                  disabled
                  readonly
                  value={this.state.email}
                  // onChange={ this.handleChange } 
                  // error={ !!message.lastName }
                  // helperText={ !!message.lastName ? message.lastName.message : "" }
                  autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="thumb"
                name="thumb"
                label="Profile Image"
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
            <img src={this.state.thumbUrl} style={{maxHeight: '100px', maxWidth: '200px', marginTop: '10px'}} alt=""/>
            </Grid>
        </Grid>
        <div className={classes.buttons}>
            <Button className={classes.button} color="primary" variant="contained" onClick={event => this.submitHandler(event)} disabled={this.props.loading} >
              {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} color="secondary" />}
              Submit
            </Button>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">User Updated</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </React.Fragment>
    );
  }
}


function mapState(state) {
    return { 
        types: state.types.items,
        tags: state.tags.items,
        loading: state.users.loading,
        errors: state.users.errors,
        user: state.users.user
    };
}

const actionCreators = {
  updateProfile: userActions.updateProfile,
  getProfile: userActions.getProfile,
};

const connectedLoginPage = connect(mapState, actionCreators)(AuthPage);

export default withRouter(withStyles(styles)(connectedLoginPage));
