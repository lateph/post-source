import React, { useState, useRef } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import queryString from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userActions, searchActions } from '../../_actions';
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
// import Button from '../extensions/Button';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    // pointerEvents: 'none',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    color: theme.palette.common.white
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  btnRegister: {

  }
}));


const AmiLargeHeader = (props) =>  {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [search, setSearch] = useState(props.q);
  


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleKeyPress = (event) => {
    // alert('asd')
    // console.log(event)
    if(event.key === 'Enter'){
      const s = queryString.stringify({ q: event.target.value});
      props.history.push(`/search?${s}`);
      console.log('enter press here! ')
    }
  }

  const handleSearchPress = (event) => {
    // alert('asd')
    // console.log(event)
    // if(event.key === 'Enter'){
      console.log(props)
      if(props.history.location.pathname === '/'){
        props.addSearch(search)
      }
      const s = queryString.stringify({ q: search});
      props.history.push(`/?${s}`);
      console.log('enter press here! ')
    // }
  }
  

  const handleChangeSearch = (x) => {
    setSearch(x.target.value)
  }

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleLogout(){
    props.logout()
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem key="create" onClick={handleMenuClose} component={Link}  to="/create">Create Article</MenuItem>,
      <MenuItem key="profile" onClick={handleMenuClose} component={Link}  to="/profile">Profile</MenuItem>,
      <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap to="/" component={RouterLink} style={{color: "white", textDecoration: "none"}} >
            PBRES.COM
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              { props.loading && <CircularProgress size={24} className={classes.button} color="secondary" /> }
              { !props.loading && <IconButton
                     aria-label="toggle password visibility"
                     className={classes.button}
                     onClick={handleSearchPress}
                     color="secondary"
                     // onMouseDown={handleMouseDownPassword}
                   >
                     <SearchIcon  className={classes.searchButton}
                     />
                   </IconButton>}
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              // inputProps={{ 'aria-label': 'search' }}
              onChange={handleChangeSearch}
              onKeyUp={handleKeyPress}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {
               !props.loggedIn &&  <Button color="inherit" component={Link} className={classes.btnLogin} to="/login">Login</Button>
            }
            {
                  !props.loggedIn &&   <Button color="inherit" component={Link} className={classes.btnRegister} to="/signup">Register</Button>
            }
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            {
              props.loggedIn &&
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { 
    loggedIn,
    types: state.types.items,
    q: state.search.q
  };
}

const actionCreators = {
  logout: userActions.logout,
  addSearch: searchActions.addSearch
};

const connectedLoginPage = connect(mapState, actionCreators)(AmiLargeHeader);
// export default withRouter(withStyles(styles)(connectedLoginPage));

export default connectedLoginPage;