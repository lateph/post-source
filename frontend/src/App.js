import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
// import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import Button from '@material-ui/core/Button';

import './App.css';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const MainLayout = props => (
  <Container>
    {props.children}
  </Container>
)

class App extends Component {
  constructor(props){
    super(props);
    this.state.token = localStorage.getItem('token');
  }

  state = {
    token: null,
    userId: null,
    isOpen: false
  };

  login = (token, userId, tokenExpiration) => {
    localStorage.setItem('token', token);
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ token: null, userId: null });
  };

  toggleMenu = () => {
    console.log("test")
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
              toggleMenu: this.toggleMenu,
            }}
          >
            <MainNavigation />
            <Switch>
              {this.state.token && <Redirect from="/login" to="/" />}
              <AppRoute exact path="/" layout={MainLayout} component={HomePage} />
              <AppRoute path="/login" layout={MainLayout} component={LoginPage} />
            </Switch> */}
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
