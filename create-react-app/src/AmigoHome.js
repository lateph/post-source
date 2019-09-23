import React,  { Component }  from 'react';
// import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Typography from './components/extensions/Typography';
import AmiLargeHeader from './components/header';
import ProductCard from './components/ProductCard';
import Expander from './components/Expander';
import CategoryPicker from './components/CategoryPicker';
import BrandPicker from './components/BrandPicker';
import EmailInput from './components/EmailInput';
import MobileSelector from './components/MobileSelector';
import TwitterButton from './components/TwitterButton';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { searchActions } from './_actions';
import queryString from 'query-string';
import TablePagination from '@material-ui/core/TablePagination';
import _ from 'lodash';

class Dashboard extends Component {
  componentDidMount() {
    // const v = queryString.parse(this.props.location.search, {arrayFormat: 'index'})
    // console.log("cuk",v)
    // if(v && v.tags){
    //   this.props.addTags(v.tags)
    // }
    // else if(v && v.q){
    //   this.props.addSearch(v.q)
    // }
    // else{
    //   this.props.search()
    // }
    this.props.loadSearch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.loadSearch()
    }
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
                      Power Builder
                    </Typography>
                    <Typography>TOTAL 319 Source</Typography>
                </Grid>
                <Grid item xs style={{textAlign:"right"}}>
                  <TwitterButton className={"default bottom"} variant={"outlined"} color={"secondary"} size={"large"}  component={Link}  to="/create">Create</TwitterButton>
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
                  {/* <Grid container>
                    <Grid item xs={12} sm={6} md={5}>
                      <ProductAds
                        {...ProductAds.test1}
                        contentSide={'left'}
                        contentBoxProps={{ maxWidth: 200 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={7}>
                      <ProductAds
                        {...ProductAds.test2}
                        contentSide={'right'}
                        contentBoxProps={{ maxWidth: 300 }}
                      />
                    </Grid>
                  </Grid>
                  <Hidden only={'xs'}>
                    <Box pt={2} pb={3} />
                  </Hidden> */}
                  <Hidden smUp>
                    <MobileSelector />
                  </Hidden>
                  <Divider light />
                  <Grid container>
                    <Hidden only={'xs'}>
                      <Grid item xs={12} sm={4} md={3}>
                        <Expander label={'TYPES'}>
                          <CategoryPicker />
                        </Expander>
                        <Divider light />
                        {/* <Expander label={'PRICE'}>
                          <PricePicker min={10} max={400} />
                        </Expander> */}
                        {/* <Divider light /> */}
                        <Expander label={'TAGS'}>
                          <BrandPicker brands={BrandPicker.data} />
                        </Expander>
                        {/* <Divider light /> */}
                        {/* <Expander label={'COLOR'}>
                          <Box p={1}>
                            <ColorPicker colors={ColorPicker.data} />
                          </Box>
                        </Expander>
                        <Divider light />
                        <Expander label={'SIZE'}>
                          <Box p={1}>
                            <SizePicker sizes={SizePicker.data} />
                          </Box>
                        </Expander> */}
                        <Divider light />
                      </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={8} md={9}>
                      <Grid container>
                        {this.props.sources.length === 0 &&  <div style={{width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography component="p">
                            No Data
                          </Typography>
                        </div>}
                        {this.props.sources.map(data => (
                          <Grid key={data._id} item xs={6} sm={6} md={4}>
                            <ProductCard source={data} bordered />
                          </Grid>
                        ))}
                      </Grid>
                      <TablePagination
                        rowsPerPageOptions={[1, 9, 18, 32]}
                        component="div"
                        count={this.props.count}
                        rowsPerPage={this.props.perPage}
                        page={this.props.page}
                        backIconButtonProps={{
                          'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                          'aria-label': 'Next Page',
                        }}
                        onChangePage={(e, newPage) => this.props.changePage(newPage)}
                        onChangeRowsPerPage={(e) => this.props.changePerPage(e.target.value)}
                      />
                      {/* <Pagination
                        rootBoxProps={{
                          mt: '20px',
                          ml: '20px',
                          borderLeft: '1px solid #f0f0f0',
                        }}
                      /> */}
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
      </>
    )
  }
};

function mapState(state) {
  return { 
      sources: state.search.sources,
      count: state.search.count,
      perPage: state.search.perPage,
      page: state.search.page,
      loading: state.search.loading,
      // alert: state.alert
  };
}

const actionCreators = {
  search: searchActions.search,
  addSearch: searchActions.addSearch,
  changePage: searchActions.changePage,
  changePerPage: searchActions.changePerPage,
  loadSearch: searchActions.loadSearch,
};

const connectedLoginPage = connect(mapState, actionCreators)(Dashboard);

export default connectedLoginPage;