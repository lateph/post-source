import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Months from '../components/common/Months';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loading from '../components/common/Loading';
import Category from '../components/Category'
import Tags from '../components/Tags'
import ContentBlog from '../components/ContentBlog'
import Content2Blog from '../components/Content2Blog'
import Topbar from '../components/Topbar';
import fetcher from '../api';

const numeral = require('numeral');
numeral.defaultFormat('0,000');

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(2),
  },
});

const monthRange = Months;

class Dashboard extends Component {

  state = {
    types: [],
    tags: [],
    blog: {},
  };

  componentDidMount() {
    this.fetchDatas();
  }

  fetchDatas() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query BlogDetail($slug: String!){
          types{
            _id
            name
            total
          }
          tags{
            _id
            name
            total
          }
          sourceSlug(slug: $slug){
            _id
            title
            desc
            category
            tags
            type{
              name
            }
          }
        }
        `,
        variables: {
          slug: this.props.match.params.slug,
        }
    };

    fetcher(requestBody)
      .then(resData => {
        this.setState({ types: resData.data.types, tags: resData.data.tags, isLoading: false, source: resData.data.sourceSlug  });

        // const events = resData.data.events;
        // if (this.isActive) {
        //   this.setState({ events: events, isLoading: false });
        // }
      })
      .catch(err => {
        console.log(err);
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center" >
            <Grid spacing={1}  container className={classes.grid}>
              <Grid item xs={12} md={2}>
                <Paper className={classes.paper}>
                  <Category types={this.state.types}/>
                </Paper>
                <Paper className={classes.paper}>
                  <Tags tags={this.state.tags}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={7}>
                <Paper className={classes.paper}>
                  <ContentBlog source={this.state.source}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                  <Content2Blog source={this.state.source}/> 
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Dashboard));
