import fetcher from './fetcher';
import _ from 'lodash';

export const searchService = {
    getAll,
};

function getAll({tags, type, userId, perPage, page, q, disablePaging}) {
    const requestBody = {
        query: `
          query CreateUser($t: [String], $c: String, $u: String, $skip: Int, $limit: Int, $q: String){
            sources(filter: {tags: $t, type: $c, creator: $u, q: $q}, pagination: {skip: $skip, limit: $limit}){
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
            countSources(filter: {tags: $t, type: $c, creator: $u, q: $q})
          }
          `,
          variables: disablePaging ?  {
            ..._.omitBy({
              t: tags,
              c: type,
              u: userId,
              q: q
            }, _.isEmpty),
          } : {
            ..._.omitBy({
              t: tags,
              c: type,
              u: userId,
              q: q
            }, _.isEmpty),
            skip: page*perPage,
            limit: perPage,
          }
      };
  
      return fetcher(requestBody)
        .then(resData => {
            return resData.data
        })
}