import fetcher from './fetcher';
import _ from 'lodash';

export const homeService = {
    load,
};

function load() {
    const requestBody = {
        query: `
          query CreateUser{
            free: sources(pagination:{limit: 9}, filter: {category: "Free"}){
                _id
                title
                shortDesc
                createdAt
                slug
                thumbUrl
                creator{
                  email
                  firstName
                  lastName
                }
              }
              trial: sources(pagination:{limit: 9}, filter: {category: "Trial"}){
                _id
                title
                shortDesc
                createdAt
                slug
                thumbUrl
                creator{
                  email
                  firstName
                  lastName
                }
              }
              paid: sources(pagination:{limit: 9}, filter: {category: "Paid"}){
                _id
                title
                shortDesc
                createdAt
                slug
                thumbUrl
                creator{
                  email
                  firstName
                  lastName
                }
              }
          }
          `,
          variables: {}
      };
  
      return fetcher(requestBody)
        .then(resData => {
            return resData.data
        })
}