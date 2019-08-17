import { authHeader } from '../_helpers';
import fetcher from './fetcherRest';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    getProfile,
    updateProfile,
    delete: _delete
};

function login(email, password) {
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
  
    return fetch(process.env.REACT_APP_URL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(async res => {
            if (res.status !== 200 && res.status !== 201) {
                throw await res.json();
            }
            return await res.json();
        })
        .then(resData => {
            localStorage.setItem('user', JSON.stringify(resData.data.login.token));
            return resData.data.login
        })
}

function register({ email, password, firstName, lastName }) {
    var requestBody = {
        query: `
          mutation CreateUser($email: String, $password: String, $firstName: String, $lastName: String) {
            createUser(userInput: {email: $email, password: $password, firstName: $firstName, lastName: $lastName}) {
              errors {
                email
                password
                firstName
                lastName
              }
              auth {
                userId
                token
                tokenExpiration
              }
            }
          }
        `,
        variables: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }
    };

    return fetch(process.env.REACT_APP_URL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
        //   this.setState({isLoading: false});
          if (res.status !== 200 && res.status !== 201) {
            throw new Error('Failed!');
          }
          return res.json();
        })
        .then(resData => {
          let errors = resData.data.createUser.errors
          if(errors !== null && errors){
            throw errors
          }
        //   this.setState({isLoading: false});
  
          return resData.data.createUser.auth
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getProfile(userId){
  // const userId = localStorage.getItem('user');
  return fetcher(`users/${userId}`,{}, {
    method: 'GET'
  })
}


function updateProfile(userId, {firstName, lastName}){
  // const userId = localStorage.getItem('user');
  return fetcher(`users/${userId}`,{
    firstName,
    lastName
  }, {
    method: 'PATCH'
  })
}


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}


function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}