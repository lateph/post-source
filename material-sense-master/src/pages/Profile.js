import React,  { Component } from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { withRouter, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import fetcher from '../api';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Topbar from '../components/Topbar';

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
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing(1)
  },
  block: {
    padding: theme.spacing(2),
  },
  rootTabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
     id: `vertical-tab-${index}`,
     'aria-controls': `vertical-tabpanel-${index}`,
    };
}

class Dashboard extends Component {

  state = {
    types: [],
    tags: [],
    blog: {
      free: [],
      trial: [],
      paid: [],
    },
    tab: 0
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
          tags(pagination:{limit: 5, sort: "-total"}){
            _id
            name
            total
          }
          free: sources(pagination:{limit: 9}, filter: {category: "Free"}){
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
          trial: sources(pagination:{limit: 9}, filter: {category: "Trial"}){
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
          paid: sources(pagination:{limit: 9}, filter: {category: "Paid"}){
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
        }
        `,
        variables: {
          // slug: this.props.match.params.slug,
        }
    };

    fetcher(requestBody)
      .then(resData => {
        this.setState({ types: resData.data.types, tags: resData.data.tags, isLoading: false, source: resData.data.sourceSlug,
          blog: {
            free: resData.data.free,
            trial: resData.data.trial,
            paid: resData.data.paid,
          }
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

  handleChange(event, tab) {
    this.setState({tab: tab});
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
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
              <div className={classes.rootTabs}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={this.state.value}
                onChange={this.handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
                <TabPanel value={this.state.tab} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={this.state.tab} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={this.state.tab} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={this.state.tab} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={this.state.tab} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={this.state.tab} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={this.state.tab} index={6}>
                Item Seven
            </TabPanel>
              </div>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Dashboard));
