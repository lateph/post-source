import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from './extensions/Typography';
import { connect } from 'react-redux'

const CategoryPicker = (props) => (
  <List>
    {props.items.map(({ active, name, total }) => {
      const color = active ? 'primary' : 'textSecondary';
      return (
        <ListItem button key={name} dense>
          <ListItemText primary={name} primaryTypographyProps={{ color }} />
          <Typography variant={'body2'} color={color}>
            {total}
          </Typography>
        </ListItem>
      );
    })}
  </List>
);

function mapState(state) {
  const { items } = state.types;
  return { 
    items
  };
}

const actionCreators = {
};

const connectedLoginPage = connect(mapState, actionCreators)(CategoryPicker);

export default connectedLoginPage;
