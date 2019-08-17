import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from './extensions/Typography';
import { connect } from 'react-redux'
import { searchActions } from '../_actions';

const CategoryPicker = (props) => {
  function handleChange(_id){
    props.add(_id)
  }
  return (
    <List>
      {props.items.map(({ _id, name, total }) => {
        const active = props.type === _id
        const color = active ? 'primary' : 'textSecondary';
        return (
          <ListItem button key={name} dense onClick={handleChange.bind(null, _id)}>
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
  const { type } = state.search;
  return { 
    items,
    type
  };
}

const actionCreators = {
  add: searchActions.addType
};

const connectedLoginPage = connect(mapState, actionCreators)(CategoryPicker);

export default connectedLoginPage;
