import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'

const useStyles = makeStyles(({ spacing }) => ({
  action: {
    right: spacing(1),
  },
}));

const BrandPicker = (props) => {
  const classes = useStyles();
  return (
    <List>
      {props.items.map(({ active, name }) => {
        const color = active ? 'primary' : 'textSecondary';
        return (
          <ListItem button key={name} dense>
            <ListItemText primary={name} primaryTypographyProps={{ color }} />
            <ListItemSecondaryAction className={classes.action}>
              <Checkbox color={'primary'} checked={active} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

function mapState(state) {
  const { items } = state.tags;
  return { 
    items
  };
}

const actionCreators = {
};

const connectedLoginPage = connect(mapState, actionCreators)(BrandPicker);

export default connectedLoginPage;
