import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import SaveAlt from '@material-ui/icons/SaveAlt';
import { red, green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(1)
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(0, 2, 1, 2),
    paddingTop: theme.spacing(1)
  },
  section2: {
    margin: theme.spacing(1, 2),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  thumbUp: {
    color: green[500],
  },
  thumbDown: {
    color: red[500],
  },
  section3: {
    margin: theme.spacing(1, 1, 1),
  },
}));

export default function MiddleDividers(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Price
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {props.source && props.source.category}
            </Typography>
          </Grid>
        </Grid>
        {props.source && props.source.type &&
            <Typography color="textSecondary" variant="body2">
                Type: {props.source.type.name}
            </Typography>
        }
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          Tags
        </Typography>
        <div>
        {props.source && props.source.tags.map(t => (
          <Chip className={classes.chip} label={t} />
        ))}
        </div>
      </div>
      <div className={classes.section3}>
        <Button className={classes.download}><SaveAlt  className={classes.leftIcon} />0 Download</Button>
      </div>
      <div className={classes.section3}>
        <Button className={classes.thumbUp}><ThumbUp  className={classes.leftIcon} />0</Button>
        <Button className={classes.thumbDown}><ThumbDown className={classes.leftIcon} />0</Button>
      </div>
      {props.source  && props.source.category == "Buy" && props.source.tags.map(t => (
        <div className={classes.section3}>
            <Button color="primary">Buy</Button>
        </div>
      ))}
    </div>
  );
}