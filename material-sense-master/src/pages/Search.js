import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import fetcher from '../api';
import Tags from '../components/Tags'
import Category from '../components/Category'
import PostCard from './home/card';
import TablePagination from '@material-ui/core/TablePagination';
import { createMuiTheme } from "@material-ui/core/styles";
import queryString from 'query-string'
import _ from 'lodash';

import Topbar from '../components/Topbar';

const theme = createMuiTheme();
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
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1),
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(2),
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
});

class Dashboard extends Component {

  state = {
    t: "",
    c: "",
    types: [],
    tags: [],
    blogs: [],

    perPage: 9,
    page: 0,
    count: 0
  };

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
  }

  handleChangePage(event, newPage){
    this.setState({
      page: newPage
    }, () => this.fetchBlog())
  }
  handleChangeRowsPerPage(event){
    this.setState({
      perPage: +event.target.value,
      page: 0
    }, () => this.fetchBlog())
  }

  componentDidMount() {
    this.fetchDatas();

    const v = queryString.parse(this.props.location.search)
    console.log(v)
    this.setState({
      t: v.t,
      c: v.c,
      page: 0
    }, () => this.fetchBlog());

    this.fetchBlog();
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    const v = queryString.parse(nextProps.location.search)
    console.log(v)

    if (nextProps.location.state === 'loadBlogs') {
      this.setState({
        t: v.t,
        c: v.c,
        page: 0
      }, () => this.fetchBlog());
    }
  }

  fetchDatas() {
    const values = queryString.parse(this.props.location.search)
    console.log(values)
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          types{
            _id
            name
            total
          }
          tags(pagination:{limit: 5, sort: "-total"}){
            _id
            name
            total
          }
        }
        `,
        variables: {
          // slug: this.props.match.params.slug,
        }
    };

    fetcher(requestBody)
      .then(resData => {
        this.setState({ types: resData.data.types, tags: resData.data.tags, isLoading: false});

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

  fetchBlog() {
    const values = queryString.parse(this.props.location.search)
    console.log()
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query CreateUser($t: String, $c: String, $skip: Int, $limit: Int){
          sources(filter: {tags: $t, type: $c}, pagination: {skip: $skip, limit: $limit}){
            _id
            title
            shortDesc
            createdAt
            slug
            thumb
            creator{
              email
              firstName
              lastName
            }
          }
          countSources(filter: {tags: $t, type: $c})
        }
        `,
        variables:  {
          ..._.omitBy({
            t: this.state.t,
            c: this.state.c,
          }, _.isEmpty),
          skip: this.state.page*this.state.perPage,
          limit: this.state.perPage,
        }
    };

    fetcher(requestBody)
      .then(resData => {
        this.setState({
          blogs: resData.data.sources,
          count: resData.data.countSources,
        });

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
    const { amount, period, start, monthlyPayment,
      monthlyInterest, data, loading } = this.state;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center" >
            <Grid spacing={1} justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <Typography variant="h6" gutterBottom>JUDUL</Typography>
                    <Typography variant="body1">
                      Text
                    </Typography>
                  </div>
                  <div>
                    <Button variant="outlined" className={classes.outlinedButtom}>
                      Create New
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={2}>
                <Grid spacing={1} container>
                  <Grid item xs={12}>
                    <Paper>
                      <Tags tags={this.state.tags} search={this.props.location.search}/>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper>
                      <Category types={this.state.types}  search={this.props.location.search}/>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={10}>
                <Paper>
                  <Grid item xs={12}  container >
                    {this.state.blogs.map((blog, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <div className={classes.card}>
                            <PostCard blog={blog}/>
                          </div>
                        </Grid>
                      ))}
                    <Grid item xs={12}>
                    <TablePagination
                        rowsPerPageOptions={[9, 18, 32]}
                        component="div"
                        count={this.state.count}
                        rowsPerPage={this.state.perPage}
                        page={this.state.page}
                        backIconButtonProps={{
                          'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                          'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
                    </Grid>
                  </Grid>
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
