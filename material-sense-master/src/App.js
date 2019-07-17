import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import Routes from './routes'
import { blue, indigo } from '@material-ui/core/colors'
import AuthContext from './context/auth-context';
import LoginPage from './pages/Login';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './pages/Home'
import Search from './pages/Search'
import Blog from './pages/Blog'
import Wizard from './components/Wizard'
import Cards from './components/Cards'
import Signup from './pages/Register'
import CreateBlog from './pages/CreateBlog';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});


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
        <ThemeProvider theme={theme}>
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
              <Switch>
                {this.state.token && <Redirect from="/login" to="/" />}
                {this.state.token && <Redirect from="/signup" to="/" />}
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/new" component={CreateBlog} />
                <Route path="/post/:slug" component={Blog} />
                <Route path="/search" component={Search} />
                <Route exact path='/signup' component={ Signup } />
                <Route exact path='/wizard' component={ Wizard } />
                <Route exact path='/cards' component={ Cards } />
              </Switch>
            </AuthContext.Provider>
          </React.Fragment>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
