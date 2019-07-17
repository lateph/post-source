import React from 'react';
import Parser from 'html-react-parser';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            { props.source && (
                <React.Fragment>
                    <Typography variant="h5" component="h3">
                        {props.source.title}
                    </Typography>
                    <div>{Parser(props.source.desc)}</div>
                </React.Fragment>
            )}
        </div>
    );
  }