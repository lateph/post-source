function updateOptions(body, options) {
    const update = { 
      ...options,
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    let jwt = localStorage.getItem('token')
    if (jwt) {
      update.headers = {
        ...update.headers,
        Authorization: `Bearer ${jwt}`,
      };
    }
    update.headers = {
      ...update.headers,
    };
    return update;
  }
  
  export default function fetcher(body, options = {}) {
    let option = updateOptions(body, options)
    return fetch(process.env.REACT_APP_URL, option).then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    });
  }