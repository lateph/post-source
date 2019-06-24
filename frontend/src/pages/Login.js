import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardHeader, CardBody, Row, Col, Spinner } from 'reactstrap';

import './Auth.css';
import AuthContext from '../context/auth-context';

class AuthPage extends Component {
  state = {
    isLogin: true,
    email: "",
    password: "",
    isLoading: false
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  submitHandler = event => {
    event.preventDefault();

    const {email, password} = this.state;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    this.setState({isLoading: true});
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        this.setState({isLoading: false});
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState({isLoading: false});
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    return (
      <Row className="justify-content-center mt-4">
        <div  className="col-md-8">
          <Card>
            <CardHeader>Login</CardHeader>
            <CardBody>
              <Form className="auth-form" onSubmit={this.submitHandler}>
                <FormGroup row>
                  <Label for="email" sm={4}>E-Mail</Label>
                  <Col sm={8}>
                    <Input type="email" id="email" value={this.state.email} onChange={ this.handleChange.bind(this) } />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="password" sm={4}>Password</Label>
                  <Col sm={8}>                  
                    <Input type="password" id="password" value={this.state.password} onChange={ this.handleChange.bind(this) } />
                  </Col>
                </FormGroup>
                <Col sm={{ size: 8, offset: 4 }}>
                  <Button type="submit" color="primary" disabled={this.state.isLoading}>
                    {this.state.isLoading && <Spinner size="sm"className="ml-2"/>}
                    Submit
                  </Button>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </div>
      </Row>
    );
  }
}

export default AuthPage;
