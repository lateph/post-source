import React, { useState, useRef } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Typography from '../extensions/Typography';
import Button from '../extensions/Button';
import MegaMenu from '../MegaMenu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { userActions, searchActions } from '../../_actions';
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom';
import queryString from 'query-string';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(({ transitions, palette, spacing }) => ({
 
  secondAppBar: ({ trigger }) => ({
    zIndex: 1099,
    transition: transitions.create('top', {
      duration: transitions.duration.leavingScreen,
      easing: transitions.easing.easeOut,
    }),
    top: trigger ? 0 : 64,
  }),
  appBarBg: {
    zIndex: 1098,
  },
  button: {
    color: palette.primary
  },
  searchInput: {
    color: palette.primary,
    margin: spacing(1),
    padding: spacing(1),
    backgroundColor: '#fff',
  },
}));

const AmiLargeHeader = (props) => {
  const trigger = useScrollTrigger();
  const inputRef = useRef(null);
  const defSA = !!props.q
  const [search, setSearch] = useState(props.q);
  const [searchAppeared, setSearchAppeared] = useState(defSA);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles({ searchAppeared, trigger });

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
  
  const handleSearchClick = () => {
    setSearchAppeared(!searchAppeared);
    if (!searchAppeared && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChangeSearch = (x) => {
    setSearch(x.target.value)
  }

  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleKeyPress = (event) => {
    // alert('asd')
    // console.log(event)
    if(event.key === 'Enter'){
      console.log(props)
      if(props.history.location.pathname === '/'){
        props.addSearch(event.target.value)
      }
      const s = queryString.stringify({ q: event.target.value});
      props.history.push(`/?${s}`);
      console.log('enter press here! ')
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleLogout(){
    props.logout()
  }

  
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar elevation={0}>
          <Toolbar>
            <Grid container wrap={'nowrap'} alignItems={'center'}>
              <Grid item xs>
                <Button
                  icon={'menu'}
                  shape={'circular'}
                  inverted
                  // onClick={() => setOpened(true)}
                />
              </Grid>
              <Grid item xs container alignItems={'center'} justify={'center'}>
                <Typography variant={'h5'} weight={'900'} spacing={'big'} to="/" component={RouterLink} style={{color: "white", textDecoration: "none"}}>
                  POWERBUILDER RESOURCE
                </Typography>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  alignItems={'center'}
                  justify={'flex-end'}
                  spacing={2}
                  wrap={'nowrap'}
                >
                  <Grid item>
                    {/*  */}
                    { 
                      !props.loggedIn ? 
                      <Button color="inherit" component={Link}  to="/login">Sign in</Button> :
                      <>
                        <Button icon={'perm_identity'} shape={'circular'} inverted onClick={handleMenu} />
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={open}
                          onClose={handleClose}
                        >
                          { !props.loggedIn ? [
                            <MenuItem key="login" onClick={handleClose} component={Link}  to="/login">Login</MenuItem>, 
                            <MenuItem key="signup" onClick={handleClose} component={Link}  to="/signup">Register</MenuItem>]
                            : 
                            [
                              <MenuItem key="create" onClick={handleClose} component={Link}  to="/create">Create Article</MenuItem>,
                              <MenuItem key="profile" onClick={handleClose} component={Link}  to="/profile">Profile</MenuItem>,
                              <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                            ] 
                          }
                        </Menu>
                      
                      </>
                    }
                  </Grid>
                  {/* <Grid item>
                    <Button icon={'far fa-heart'} shape={'circular'} inverted />
                  </Grid>
                  <Grid item>
                    <Button
                      icon={'far fa-shopping-cart'}
                      shape={'circular'}
                      inverted
                    />
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Slide>
      <AppBar position={'sticky'} elevation={0} className={classes.appBarBg}>
        <Toolbar />
      </AppBar>
      <AppBar
        elevevation={2}
        position={'sticky'}
        className={classes.secondAppBar}
      >
        <Input
          id="adornment-password"
          type={'text'}
          placeholder={'Type to search...'}
          className={classes.searchInput}
          value={search}
          onChange={handleChangeSearch}
          onKeyUp={handleKeyPress}
          endAdornment={
            <InputAdornment position="end">
              { props.loading && <CircularProgress size={24} className={classes.button} color="secondary" /> }
              { !props.loading && <IconButton
                aria-label="toggle password visibility"
                className={classes.button}
                onClick={handleSearchPress}
                // onMouseDown={handleMouseDownPassword}
              >
                <SearchIcon  className={classes.button}
                />
              </IconButton>
            }
            </InputAdornment>
          }
        />
      </AppBar>
    </>
  );
};

AmiLargeHeader.propTypes = {};
AmiLargeHeader.defaultProps = {};

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
