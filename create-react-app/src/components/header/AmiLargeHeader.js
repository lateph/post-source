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
import { userActions } from '../../_actions';
import { connect } from 'react-redux'

const useStyles = makeStyles(({ transitions }) => ({
  searchInput: ({ searchAppeared }) => ({
    width: searchAppeared ? 180 : 0,
    opacity: searchAppeared ? 1 : 0,
    transition: transitions.create(),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginTop: searchAppeared ? 8 : 0,
    marginLeft:searchAppeared ? 8: 0,
    padding: searchAppeared ? '0 8px' : '0',
    display: 'inline-block',
    color: '#ffffff',
  }),
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
}));

const AmiLargeHeader = (props) => {
  const trigger = useScrollTrigger();
  const inputRef = useRef(null);
  const [searchAppeared, setSearchAppeared] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(true)
  const classes = useStyles({ searchAppeared, trigger });
  const handleSearchClick = () => {
    setSearchAppeared(!searchAppeared);
    if (!searchAppeared && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const open = Boolean(anchorEl);

  function handleChange(event) {
    setAuth(event.target.checked);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
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
                  icon={'far fa-bars'}
                  shape={'circular'}
                  inverted
                  // onClick={() => setOpened(true)}
                />
              </Grid>
              <Grid item xs container alignItems={'center'} justify={'center'}>
                <Typography variant={'h5'} weight={'900'} spacing={'big'}>
                  AMIGO
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
                    <Button
                      icon={'fas fa-search'}
                      shape={'circular'}
                      inverted
                      onClick={handleSearchClick}
                    />
                    <InputBase
                      inputRef={inputRef}
                      className={classes.searchInput}
                    />
                  </Grid>
                  <Grid item>
                    <Button icon={'far fa-user'} shape={'circular'} inverted onClick={handleMenu} />
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
                      { !props.loggedIn ? [<MenuItem onClick={handleClose} component={Link}  to="/login">Login</MenuItem>, <MenuItem onClick={handleClose} component={Link}  to="/signup">Register</MenuItem>] : <MenuItem onClick={handleLogout}>Logout</MenuItem> }
                    </Menu>
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
        <Toolbar>
          <MegaMenu
            menus={props.types.map(type => {
              return { label: type.name }
            })}
          />
        </Toolbar>
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
    types: state.types.items
  };
}

const actionCreators = {
  logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(AmiLargeHeader);
// export default withRouter(withStyles(styles)(connectedLoginPage));

export default connectedLoginPage;
