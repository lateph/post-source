import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux'
import { searchActions } from '../_actions';


const useStyles = makeStyles(({ spacing }) => ({
  action: {
    right: spacing(1),
  },
}));

const BrandPicker = (props) => {
  const classes = useStyles();
  console.log("props",props)
  function handleChange(_id){
    // console.log(_id)
    props.add(_id)
  }
  return (
    <List>
      {props.items.map(({ _id, name }) => {
        const active = props.actives.includes(_id)
        const color = active ? 'primary' : 'textSecondary';
        return (
          <ListItem button key={name} dense>
            <ListItemText primary={name} primaryTypographyProps={{ color }} />
            <ListItemSecondaryAction className={classes.action}>
              <Checkbox color={'primary'} checked={active} onChange={handleChange.bind(null, _id)}/>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

function mapState(state) {
  const { items } = state.tags;
  const { tags } = state.search;
  return { 
    items,
    actives: tags
  };
}

const actionCreators = {
  add: searchActions.addTag,
  // add: searchActions.addTag
};

const connectedLoginPage = connect(mapState, actionCreators)(BrandPicker);

export default connectedLoginPage;
