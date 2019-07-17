import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import SimpleLineChart from './SimpleLineChart';
import Months from './common/Months';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Loading from './common/Loading';
import fetcher from '../api';
import Category from '../components/Category'


import Topbar from './Topbar';

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
        query{
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
        }
        `,
        variables: {
          // slug: this.props.match.params.slug,
        }
    };

    fetcher(requestBody)
      .then(resData => {
        console.log("type", resData)
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
    const { amount, period, start, monthlyPayment,
      monthlyInterest, data, loading } = this.state;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center" >
            <Grid spacing={1} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <Typography variant="h6" gutterBottom>AAA{process.env.REACT_APP_URL}</Typography>
                    <Typography variant="body1">
                      Adjust and play with our sliders.
                    </Typography>
                  </div>
                  <div>
                    <Button variant="outlined" className={classes.outlinedButtom}>
                      Get help
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={2}>
                <Paper>
                  <Category types={this.state.types}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={10}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="subtitle1" gutterBottom>
                      Period
                    </Typography>
                    <Typography variant="body1">
                      A sample period
                    </Typography>
                    <div className={classes.blockCenter}>
                      <Typography color='secondary' variant="h6" gutterBottom>
                        {period} months
                      </Typography>
                    </div>
                    <div>
                      <Slider
                        value={period}
                        min={1}
                        max={6}
                        step={1}
                        onChange={this.handleChangePeriod}
                      />
                    </div>
                    <div className={classes.rangeLabel}>
                      <div>
                        <Typography variant="subtitle2">
                          1 month
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="subtitle2">
                          6 months
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Paper>
              </Grid>
              <Grid container spacing={4} justify="center">
                <Grid item xs={12} md={8} >
                  <Paper className={classes.paper} style={{position: 'relative'}}>
                    <Loading loading={loading} />
                    <div className={loading ? classes.loadingState : ''}>
                      <Typography variant="subtitle1" gutterBottom>
                        Some details
                      </Typography>
                      <Typography variant="body1">
                        Details about the graph
                      </Typography>
                      <div style={{marginTop: 14, marginBottom: 14}}>
                        <div className={classes.inlining}>
                          <Avatar className={classes.loanAvatar}></Avatar>
                          <Typography className={classes.inlining} variant="subtitle2" gutterBottom>
                            Type
                          </Typography>
                          <Typography className={classes.inlining} color='secondary' variant="h6" gutterBottom>
                            {numeral(monthlyPayment).format()} units
                          </Typography>
                        </div>
                        <div className={classes.inlining}>
                          <Avatar className={classes.interestAvatar}></Avatar>
                          <Typography className={classes.inlining} variant="subtitle2" gutterBottom>
                            Othe type
                          </Typography>
                          <Typography className={classes.inlining} color="secondary" variant="h6" gutterBottom>
                            {numeral(monthlyInterest).format()} units
                          </Typography>
                        </div>
                      </div>
                      <div >
                        <SimpleLineChart data={data} />
                      </div>
                    </div>
                  </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper} style={{position: 'relative'}}>
                  <Loading loading={loading} />
                  <div className={loading ? classes.loadingState : ''}>
                    <Typography variant="subtitle1" gutterBottom>
                      State
                    </Typography>
                    <div className={classes.mainBadge}>
                      <VerifiedUserIcon style={{fontSize: 72}} fontSize={'large'} color={'secondary'} />
                      <Typography variant="h5" color={'secondary'} gutterBottom>
                        Verified
                      </Typography>
                    </div>
                    <div className={classes.buttonBar}>
                      <Button to={{ pathname: "/dashboard", search: `?type=save` }} component={Link} variant="outlined" className={classes.actionButtom}>
                        Save
                      </Button>
                      <Button to={{ pathname: "/dashboard", search: `?type=apply` }} component={Link} color='primary' variant="contained" className={classes.actionButtom}>
                        Apply
                      </Button>
                    </div>
                  </div>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Dashboard));
