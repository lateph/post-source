import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from './components/extensions/Typography';
import AmiLargeHeader from './components/header';
import EmailInput from './components/EmailInput';
import MobileSelector from './components/MobileSelector';
import TwitterButton from './components/TwitterButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { searchActions } from './_actions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProfileUser from './ProfileUser';
import ProfileListArticle from './ProfileListArticle'

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
  componentDidMount() {
    this.props.search()
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
      tab: 0
  }
  setValue(v){
    this.setState({
        tab: v
    })
  }
  handleChange(event, newValue) {
    this.setValue(newValue);
  }
  render() {
    return (
      <>
        <CssBaseline />
        <AmiLargeHeader />
        <Box bgcolor={'common.white'}>
          <Box
            bgcolor={'#fff6da'}
            height={{
              xs: 144,
              md: 200,
            }}
            textAlign={'center'}
            pt={{
              xs: 3,
              md: 5,
            }}
          >
            <Container fixed>
              <Grid container spacing={3}>
                <Grid item xs>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                      secondFamily
                      weight={'bold'}
                      size={'big'}
                      bottomSpace={'small'}
                    >
                      User Profile
                    </Typography>
                    {/* <Typography>TOTAL 319 Source</Typography> */}
                </Grid>
                <Grid item xs style={{textAlign:"right"}}>
                  <TwitterButton className={"default bottom"} variant={"outlined"} color={"secondary"} size={"large"}  component={Link}  to="/create">Create Article</TwitterButton>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box
            mt={{
              xs: -5,
              md: -8,
            }}
            mb={-5.5}
            position={'relative'}
            zIndex={1}
          >
            <Container fixed>
              <Box
                mx={{
                  xs: -2,
                  sm: 0,
                }}
              >
                <Paper style={{ boxShadow: '0 2px 12px 0 rgba(0,0,0,0.12)' }}>
                  <Grid container>
                    
                  </Grid>
                  <Hidden smUp>
                    <MobileSelector />
                  </Hidden>
                  <Divider light />
                  <Grid container>
                  <div style={{flexGrow: 1,display: 'flex',minHeight: 300}}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={this.state.tab}
                        onChange={this.handleChange}
                        aria-label="Vertical tabs example"
                        style={{overflow:"visible"}}
                        // className={classes.tabs}
                    >
                        <Tab label="User Profile" {...a11yProps(0)} />
                        <Tab label="List Aricle" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={this.state.tab} index={0}>
                        <ProfileUser />
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={1} style={{width: '100%'}} >
                        <ProfileListArticle style={{width: '100%'}} />
                    </TabPanel>
                    </div>
                  </Grid>
                </Paper>
              </Box>
            </Container>
          </Box>
          <Box
            bgcolor={'grey.200'}
            textAlign={'center'}
            position={'relative'}
            zIndex={0}
            pt={10}
            pb={5}
          >
            <Container maxWidth={'sm'}>
              <Typography
                spacing={'medium'}
                secondFamily
                weight={500}
                gutterBottom
              >
                SUBSCRIBE TO OUR NEWSLETTER
              </Typography>
              <Typography variant={'caption'} display={'block'}>
                To always stay update with our products, news, and special
                discounts
              </Typography>
              <Typography
                variant={'caption'}
                display={'block'}
                bottomSpace={'medium'}
              >
                enter you email below
              </Typography>
              <EmailInput />
            </Container>
          </Box>
        </Box>
      </>
    )
  }
};

function mapState(state) {
  return { 
      sources: state.search.sources,
      count: state.search.count,
      // loading: state.sources.loading,
      // alert: state.alert
  };
}

const actionCreators = {
  search: searchActions.search
};

const connectedLoginPage = connect(mapState, actionCreators)(Dashboard);

export default connectedLoginPage;