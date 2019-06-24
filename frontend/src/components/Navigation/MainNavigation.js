import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
import AuthContext from '../../context/auth-context';

export default class Example extends React.Component {
  
  static contextType = AuthContext;

  state = {
    isOpen: false
  }
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  toggleMenu(e) {
    // this.setState({
    //   isOpen: !this.state.isOpen
    // });
    // console.log(this.context)
    e.preventDefault();
    this.context.toggleMenu()
  }

  logout(e) {
    e.preventDefault();
    this.context.logout()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <AuthContext.Consumer>
        {context => {
          return (
            <div>
              <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <form className="form-inline mt-2 mt-md-0 ml-auto">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                  </form>
                  <Nav navbar>
                    {!context.token && (
                      <React.Fragment>
                        <NavItem>
                          <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="/register">Register</NavLink>
                        </NavItem>
                      </React.Fragment>)}
                    {context.token && (
                      <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                          Username
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem>
                            Option 1
                          </DropdownItem>
                          <DropdownItem>
                            Option 2
                          </DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem onClick={this.logout}>
                            Logout
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    )}
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
          );
        }}
      </AuthContext.Consumer>
    )
  }
}