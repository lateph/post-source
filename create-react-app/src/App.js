import React, { Component } from 'react';
import Typography from './components/extensions/Typography';
import { Helmet } from 'react-helmet';
import AuthContext from './context/auth-context';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './AmigoHome'
import LoginPage from './Login'

const url =
  // eslint-disable-next-line max-len
  'https://fonts.googleapis.com/css?family=Poppins:200,400,500,700,900|Oswald:400,700&display=swap';
  
  Typography.setSecondFamily("'Oswald', sans-serif");



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
            <Helmet>
              <link href={url} rel="stylesheet" />
            </Helmet>
            <Switch>
                {this.state.token && <Redirect from="/login" to="/" />}
                {this.state.token && <Redirect from="/signup" to="/" />}
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                {/* <Route path="/new" component={CreateBlog} />
                <Route path="/post/:slug" component={Blog} />
                <Route path="/search" component={Search} />
                <Route exact path='/signup' component={ Signup } />
                <Route exact path='/wizard' component={ Wizard } />
                <Route exact path='/cards' component={ Cards } /> */}
              </Switch>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
