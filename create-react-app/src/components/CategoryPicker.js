import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from './extensions/Typography';
import { connect } from 'react-redux'
import { searchActions } from '../_actions';
import { Link } from 'react-router-dom';
import queryString from 'query-string'

const CategoryPicker = (props) => {
  const values = queryString.parse(props.location.search, {arrayFormat: 'index'})

  function handleChange(_id){
    props.add(_id)
  }
  return (
    <List>
      {props.items.map(({ _id, name, total }) => {
        const active = values.type === name
        const color = active ? 'primary' : 'textSecondary';
        const search = queryString.stringify({...values, type: name}, {arrayFormat: 'index'});

        return (
          <ListItem button key={name} dense component={Link} 
          to={{pathname: "/search", search: search, state: "loadBlogs" }}>
            <ListItemText primary={name} primaryTypographyProps={{ color }} />
            <Typography variant={'body2'} color={color}>
              {total}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  )
};

function mapState(state) {
  const { items } = state.types;
  const { location } = state.router;

  return { 
    items,
    location
  };
}

const actionCreators = {
  add: searchActions.addType
};

const connectedLoginPage = connect(mapState, actionCreators)(CategoryPicker);

export default connectedLoginPage;
