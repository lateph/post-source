import React,  { Component }  from 'react';
// import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from './components/extensions/Typography';
import AmiLargeHeader from './components/header';
import ProductAds from './components/ProductAds';
import ProductCard from './components/ProductCard';
import Expander from './components/Expander';
import CategoryPicker from './components/CategoryPicker';
import PricePicker from './components/PricePicker';
import BrandPicker from './components/BrandPicker';
import ColorPicker from './components/ColorPicker';
import SizePicker from './components/SizePicker';
import Pagination from './components/Pagination';
import EmailInput from './components/EmailInput';
import MobileSelector from './components/MobileSelector';
import TwitterButton from './components/TwitterButton';
import PostCard01 from './components/PostCard01';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { sourceActions } from './_actions';
import renderHTML from 'react-render-html';
import Parser from 'html-react-parser';

class Dashboard extends Component {
  componentDidMount() {
    if(this.props.match && this.props.match.params && this.props.match.params){
      this.props.getSlug(this.props.match.params.slug)
    }
  }
  render() {
    return (
      <>
        <CssBaseline />
        <AmiLargeHeader />
        {this.props.source &&
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
                        {this.props.source.title}
                      </Typography>
                      <Typography>TOTAL VIEW {this.props.source.view}</Typography>
                  </Grid>
                  <Grid item xs style={{textAlign:"right"}}>
                    {/* <TwitterButton className={"default bottom"} variant={"outlined"} color={"secondary"} size={"large"}  component={Link}  to="/create">Create</TwitterButton> */}
                    <TwitterButton className={"default bottom"} variant={"outlined"} color={"secondary"} size={"large"}  component={Link}  to={`/update/${this.props.source.slug}`}>Update</TwitterButton>
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
                    <Hidden smUp>
                      <MobileSelector />
                    </Hidden>
                    <Divider light />
                    <Grid container>
                      <Hidden only={'xs'}>
                        <Grid item xs={12} sm={4} md={3}>
                          <PostCard01 source={this.props.source} />
                        </Grid>
                      </Hidden>
                      <Grid item xs={12} sm={8} md={9}>
                        <Grid container style={{ borderLeft: "1px solid #f0f0f0" }}>
                          <div style={{width:'100%', padding: '10px'}}>
                            {Parser(this.props.source.desc)}
                          </div>
                        </Grid>
                      </Grid>
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
        }
      </>
    )
  }
};

function mapState(state) {
  return { 
      source: state.sources.source,
      // loading: state.sources.loading,
      // alert: state.alert
  };
}

const actionCreators = {
  getSlug: sourceActions.getSlug,
};

const connectedLoginPage = connect(mapState, actionCreators)(Dashboard);

export default connectedLoginPage;