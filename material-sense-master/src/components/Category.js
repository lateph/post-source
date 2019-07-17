import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
      
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList(props) {

    const classes = useStyles();
    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader" className={classes.header}>
            Type
          </ListSubheader>
        }
        className={classes.root}
      >
        {props.types.map(t => (
            <ListItem button key={t._id}>
                <ListItemText primary={t.name}/>
                <ListItemSecondaryAction>
                    {t.total}
                </ListItemSecondaryAction>
            </ListItem>
        ))}
      </List>
    );
  }