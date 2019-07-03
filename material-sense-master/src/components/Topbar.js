import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Menu from './Menu';
import AuthContext from '../context/auth-context';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


const logo = require('../images/logo.svg');

const styles = theme => ({
  appBar: {
    position: 'relative',
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.grey['100']}`,
    backgroundColor: 'white',

  },
  inline: {
    display: 'inline'
  },
  flex: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  productLogo: {
    display: 'inline-block',
    borderLeft: `1px solid ${theme.palette.grey['A100']}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up('md')]: {
      paddingTop: '1.5em'
    }
  },
  tagline: {
    display: 'inline-block',
    marginLeft: 10,
    [theme.breakpoints.up('md')]: {
      paddingTop: '0.8em'
    }
  },
  iconContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  iconButton: {
    float: 'right'
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 'auto'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.grey['A100'], 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.grey['A100'], 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})

class Topbar extends Component {
  static contextType = AuthContext;

  state = {
    value: 0,
    menuDrawer: false
  };

  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.context.logout()
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  mobileMenuOpen = (event) => {
    this.setState({ menuDrawer: true });
  }

  mobileMenuClose = (event) => {
    this.setState({ menuDrawer: false });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleMenuClose() {
    // const [setAnchorEl] = React.useState(null);
    // setAnchorEl(null);
    // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    // setMobileMoreAnchorEl(null);
  }

  current = () => {
    if(this.props.currentPath === '/home') {
      return 0
    }
    if(this.props.currentPath === '/login') {
      return 1
    }
    if(this.props.currentPath === '/signup') {
      return 2
    }
    if(this.props.currentPath === '/profile') {
      return 3
    }
    if(this.props.currentPath === '/cards') {
      return 4
    }

  }

  render() {

    const { classes } = this.props;

    return (
      <AuthContext.Consumer>
        {context => {
          return (
            <AppBar position="absolute" color="default" className={classes.appBar}>
              <Toolbar>
                  <Grid container spacing={24} alignItems="baseline">
                    <Grid item xs={12} className={classes.flex}>
                      <div className={classes.inline}>
                        <Typography variant="h6" color="inherit" noWrap>
                          <Link to='/' className={classes.link}>
                            <img width={20} src={logo} alt="" />
                            <span className={classes.tagline}>Material Sense</span>
                          </Link>
                        </Typography>
                      </div>
                      { !this.props.noTabs && (
                        <React.Fragment>
                          <div className={classes.productLogo}>
                            <Typography>
                              A material UI Template
                            </Typography>
                          </div>
                          <div className={classes.iconContainer}>
                            <IconButton onClick={this.mobileMenuOpen} className={classes.iconButton} color="inherit" aria-label="Menu">
                              <MenuIcon />
                            </IconButton>
                          </div>
                          <div className={classes.tabContainer}>
                            <SwipeableDrawer anchor="right" open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
                              <AppBar title="Menu" />
                              <List>
                                <ListItem component={Link} to={{pathname: "/", search: this.props.location.search}} button key="Home">
                                  <ListItemText primary="Home" />
                                </ListItem>
                              </List>
                            </SwipeableDrawer>
                            <Tabs
                              value={this.current() || this.state.value}
                              indicatorColor="primary"
                              textColor="primary"
                              onChange={this.handleChange}
                            >
                              <Tab key={0} component={Link} to={{pathname: "/", search: this.props.location.search}} classes={{root: classes.tabItem}} label="Home" />
                              {!context.token && (
                                <Tab key={1} component={Link} to={{pathname: "/login", search: this.props.location.search}} classes={{root: classes.tabItem}} label="Login" />
                              )}
                              {!context.token && (
                                <Tab key={2} component={Link} to={{pathname: "/signup", search: this.props.location.search}} classes={{root: classes.tabItem}} label="Signup" />
                              )}
                              {context.token && (
                                <Tab key={2} component={Link} to={{pathname: "/create", search: this.props.location.search}} classes={{root: classes.tabItem}} label="Create Blog" />
                              )}
                              {context.token && (
                                <Tab key={3} component={Link} to={{pathname: "/profile", search: this.props.location.search}} classes={{root: classes.tabItem}} label="Profile" />
                                )}
                              {context.token && (
                                <Tab key={99} classes={{root: classes.tabItem}} label="Logout" onClick={this.logout}/>                              
                              )}
                            </Tabs>
                          </div>
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'Search' }}
                    />
                  </div>
              </Toolbar>
            </AppBar>
          )
        }}
      </AuthContext.Consumer>
    )
  }
}

export default withRouter(withStyles(styles)(Topbar))
