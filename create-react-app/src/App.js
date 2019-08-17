import React, { Component } from 'react';
import Typography from './components/extensions/Typography';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Redirect, Router } from 'react-router-dom';
import HomePage from './AmigoHome'
import Profile from './Profile'
import LoginPage from './Login'
import CreatePage from './Create'
import { history } from './_helpers';
import { typeActions, tagActions } from './_actions';
import { connect } from 'react-redux'
import Signup from './Register'
import Blog from './Blog'

const url =
  // eslint-disable-next-line max-len
  'https://fonts.googleapis.com/css?family=Poppins:200,400,500,700,900|Oswald:400,700&display=swap';
  
  Typography.setSecondFamily("'Oswald', sans-serif");



class App extends Component {

  componentDidMount() {
    this.props.getTypes()
    this.props.getTags()
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Helmet>
            <link href={url} rel="stylesheet" />
          </Helmet>
          <Router history={history}>
              {/* {this.props.loggedIn === false && <Redirect from="/create" to="/login" />} */}
              {/* {this.props.loggedIn === false && <Redirect from="/update" to="/login" />} */}
              {/* {this.state.token && <Redirect from="/signup" to="/" />} */}
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />              
              <Route exact path='/signup' component={ Signup } />
              <Route exact path='/profile' component={ Profile } />
              <Route path="/create" component={CreatePage} />
              <Route path="/post/:slug" component={Blog} />
              <Route path="/update/:slug" component={CreatePage} />
              {/*<Route path="/post/:slug" component={Blog} />
              <Route path="/search" component={Search} />
              <Route exact path='/signup' component={ Signup } />
              <Route exact path='/wizard' component={ Wizard } />
              <Route exact path='/cards' component={ Cards } /> */}
            </Router>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}


function mapState(state) {
  const { loggedIn } = state.authentication;

  return { loggedIn };
}

const actionCreators = {
  getTypes: typeActions.getAll,
  getTags: tagActions.getAll,
};

const connectedLoginPage = connect(mapState, actionCreators)(App);
export default connectedLoginPage;
