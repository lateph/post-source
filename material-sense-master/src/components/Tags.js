import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'; 
import { Link } from 'react-router-dom';
import queryString from 'query-string'
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class Tags extends Component {
  render() {
    const values = queryString.parse(this.props.search)

    const { classes } = this.props;
    return (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Popular Tags
          </ListSubheader>
        }
        className={classes.root}
      >
        {this.props.tags.map(t => (
            <ListItem 
              key={t._id} 
              component={Link} 
              to={{pathname: "/search", search: queryString.stringify({...values, t: t.name}), state: "loadBlogs" }} 
              button
              selected={values.t === t.name}
            >
                <ListItemText primary={t.name}/>
                <ListItemSecondaryAction>
                    {t.total}
                </ListItemSecondaryAction>
            </ListItem>
        ))}
      </List>
    );
  }
}


  
export default withStyles(styles)(Tags);