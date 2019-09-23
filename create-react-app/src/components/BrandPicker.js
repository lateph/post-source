import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import { searchActions } from '../_actions';
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import Typography from './extensions/Typography';
import _ from 'lodash';


const useStyles = makeStyles(({ spacing }) => ({
  action: {
    right: spacing(1),
  },
}));

const BrandPicker = (props) => {
  const classes = useStyles();
  const values = queryString.parse(props.location.search, {arrayFormat: 'index'})
  
  return (
    <List style={{paddingTop: "0px"}}>
      {props.items.map(({ _id, name, total }) => {
        const activeItems = _.filter(props.items, i => _.find(values.tags ? values.tags : [], j => j === i.name))
        const sudahAda = _.find(activeItems, (i) => i.name === name)
        const color = sudahAda ? 'primary' : 'textSecondary';

        console.log("jancok", name, !!sudahAda, activeItems)
        const search = sudahAda ? 
            queryString.stringify({...values, tags: 
              _.chain(activeItems).filter(i => i.name !== name).map(i => i.name).value() 
            }, {arrayFormat: 'index'}) 
          : queryString.stringify({...values, tags: [..._.map(activeItems, o => o.name), name]}, {arrayFormat: 'index'});
        return (
          props.disableAction !== true ? <ListItem button key={name} dense  component={Link} 
          to={{pathname: "/search", search: search, state: "loadBlogs" }}>
            <ListItemText primary={name} primaryTypographyProps={{ color }} />
              <ListItemSecondaryAction className={classes.action}>
                {/* <Checkbox color={'primary'} checked={active} onChange={handleChange.bind(null, _id)}/> */}
                <Checkbox color={'primary'} checked={!!sudahAda}/>
              </ListItemSecondaryAction>
          </ListItem> : 
          <ListItem 
            key={_id} 
            component={Link} 
            to={{pathname: "/search", search: search, state: "loadBlogs" }} 
            button
            // selected={values.t === _id}
          >
              <ListItemText primary={name}/>
              <Typography variant={'body2'} color={color}>
                {total}
              </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

function mapState(state) {
  const { items } = state.tags;
  const { location } = state.router;
  return { 
    items,
    location
  };
}

const actionCreators = {
  add: searchActions.addTag,
  // add: searchActions.addTag
};

const connectedLoginPage = connect(mapState, actionCreators)(BrandPicker);

export default connectedLoginPage;
