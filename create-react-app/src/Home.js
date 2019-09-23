import React,  { Component }  from 'react';
// import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Typography from './components/extensions/Typography';
import AmiLargeHeader from './components/header';
import ProductCard from './components/ProductCard';
import Expander from './components/Expander';
import BrandPicker from './components/BrandPicker';
import EmailInput from './components/EmailInput';
import { connect } from 'react-redux'
import { searchActions, homeActions } from './_actions';
import queryString from 'query-string';
import TablePagination from '@material-ui/core/TablePagination';
import CategoryTab from './home/tab'

class Dashboard extends Component {
  state = {
    types: [],
    tags: [],
  };

  componentDidMount() {
    const v = queryString.parse(this.props.location.search, {arrayFormat: 'index'})
    console.log("cuk e",v.tags)
    // this.props.load()
    // if(v && v.c){
    //   this.props.add(v.c, false)
    // }
    // if(v && v.tags){
      // console.log("cuk",v)
      // this.props.addTags(v.tags, false)
    // }
    // else if(v && v.q){
    //   this.props.addSearch(v.q)
    // }
    // else{
    //   this.props.search()
    // }
  }
  // componentDidUpdate(nextProps){
  //   console.log(nextProps)
  //   const v = queryString.parse(nextProps.location.search)
  //   console.log(v)

  //   if (nextProps.location.state === 'loadBlogs') {
  //     if(v.c){
  //       this.props.add(v.c, false)
  //     }
  //     this.props.search()
  //     // this.setState({
  //     //   t: v.t,
  //     //   c: v.c,
  //     //   page: 0
  //     // }, () => this.fetchBlog());
  //   }
  // }

  render() {
    return (
      <>
        <CssBaseline />
        <AmiLargeHeader />
        <Box bgcolor={'common.white'}>
          <Box
            // bgcolor={'#fff6da'}
            height={{
              // xs: 144,
              // md: 200,
              xs: 144,
              md: 144,
            }}
            textAlign={'center'}
            pt={{
              xs: 3,
              md: 5,
            }}
          >

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
                <Grid container>
                    <Hidden only={'xs'}>
                      <Grid item xs={12} sm={2} md={2}>
                        <Box style={{ border: '1px solid #f0f0f0', borderRadius: '4px 4px 4px 4px'}}>
                          <Expander label={'TAGS'}>
                            <BrandPicker brands={BrandPicker.data} disableAction={true}/>
                          </Expander>
                        </Box>
                      </Grid>
                    </Hidden>
                    <Grid item xs={12} sm={10} md={10} style={{paddingLeft: "8px"}}>
                      <CategoryTab blog={this.props.blog}/>                      
                      <Grid container>
                        {this.props.sources.length === 0 &&  <div style={{width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                          <Typography component="p">
                            No Data
                          </Typography>
                        </div>}
                        {this.props.sources.map(data => (
                          <Grid key={data._id} item xs={6} sm={4} md={2} style={{paddingLeft: "8px"}}>
                            <ProductCard source={data} bordered />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
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
            mt={10}
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
      blog: {
        free: state.home.free,
        trial: state.home.trial,
        paid: state.home.paid,
      },
      perPage: state.search.perPage,
      page: state.search.page,
      loading: state.search.loading,
      // alert: state.alert
  };
}

const actionCreators = {
  load: homeActions.load,
  search: searchActions.search,
  add: searchActions.addType,
  addTags: searchActions.addTags,
  addSearch: searchActions.addSearch,
  changePage: searchActions.changePage,
  changePerPage: searchActions.changePerPage,
};

const connectedLoginPage = connect(mapState, actionCreators)(Dashboard);

export default connectedLoginPage;