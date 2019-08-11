function updateOptions(body, options) {
    const update = { 
      ...options,
      body: JSON.stringify(body),
      method: options.method ? options.method : 'POST',
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
  
  // export default function fetcher(url ,body, options = {}) {
  //   let option = updateOptions(body, options)
  //   return fetch(`${process.env.REACT_APP_URL_REST}/${url}`, option).then(res => {
  //     if (res.status !== 200 && res.status !== 201) {
  //       throw new Error('Failed!');
  //     }
  //     return res.json();
  //   });
  // }

  export default async function fetcher(url ,body, options = {}) {
    let option = updateOptions(body, options)
    const res =  await fetch(`${process.env.REACT_APP_URL_REST}/${url}`, option)
    if(res.status === 400){
      throw await res.json()
    }
    else if (res.status !== 200 && res.status !== 201) {
      throw new Error('Failed!')
    }
    return await res.json()
  }