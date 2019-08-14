import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// import Collapse from '@material-ui/core/Collapse';
// import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Grid from '@material-ui/core/Grid';
// import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { searchActions } from '../_actions';
import { connect } from 'react-redux'
import _ from 'lodash';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    margin: '0 auto',
    paddingTop: 8,
    height: 64,
  },
  tabsRoot: {},
  tabsIndicator: {
    maxWidth: 56,
    transform: 'translateX(52px)',
    backgroundColor: palette.grey[200],
  },
  tab: {
    color: palette.common.white,
    opacity: 1,
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: '1px',
    minWidth: 160,
  },
  collapsed: {
    position: 'absolute',
    left: 0,
    top: 64,
    width: '100%',
  },
  paper: {
    minHeight: 240,
  },
  subheader: {
    fontWeight: 'bold',
  },
  cover: {
    display: 'block',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    padding: '16px 16px 16px 0',
  },
}));

const MegaMenu = ({ menus, type, add}) => {
  const index  = _.findIndex(menus, (m) => {
    return m._id == type
  })
  console.log(index, type, menus)
  const [tabIndex, setTabIndex] = useState(index);
  React.useEffect(() => {
    setTabIndex(index);
  }, [index])
  const classes = useStyles();
  console.log("kepet", menus)
  function header(_id){
    add(_id)    
  }
  return (
    <div className={classes.root} onMouseLeave={() => setTabIndex(index)}>
      <Tabs
        centered
        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        value={tabIndex}
      >
        {menus.map((item, index) => (
          <Tab
            component={Link}
            onClick={() => header(item._id)}
            to={{pathname: "/", 
            search: queryString.stringify({ c: item._id}), state: "loadBlogs" }} 
            key={item.label}
            {...item}
            className={classes.tab}
            onMouseOver={() => setTabIndex(index)}
            onFocus={() => setTabIndex(index)}
          />
        ))}
      </Tabs>
      {/* <Collapse in={tabIndex >= 0} className={classes.collapsed}>
        <Paper elevation={2} className={classes.paper}>
          <Container maxWidth={'md'}>
            <Grid container justify={'center'}>
              <Grid item xs={3}>
                <img src={cover} alt={'cover'} className={classes.cover} />
              </Grid>
              {subMenus.map(({ label, children }) => (
                <Grid key={label} item xs={3}>
                  <List
                    subheader={
                      <ListSubheader
                        className={classes.subheader}
                        disableSticky
                      >
                        {label}
                      </ListSubheader>
                    }
                  >
                    {children.map(subLabel => (
                      <ListItem key={subLabel} button dense>
                        <ListItemText primary={subLabel} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </Collapse> */}
    </div>
  );
};

MegaMenu.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
  ),
  subMenus: PropTypes.arrayOf(PropTypes.shape({})),
  cover: PropTypes.string,
};
MegaMenu.defaultProps = {
  menus: [],
  subMenus: [],
  cover:
    // eslint-disable-next-line max-len
    'https://images.unsplash.com/photo-1470468969717-61d5d54fd036?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=983&q=80',
};



function mapState(state) {
  // const { items } = state.types;
  const { type } = state.search;
  return { 
    // items,
    type
  };
}

const actionCreators = {
  add: searchActions.addType
};

const connectedLoginPage = connect(mapState, actionCreators)(MegaMenu);

export default connectedLoginPage;
