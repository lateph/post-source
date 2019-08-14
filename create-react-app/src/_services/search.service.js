import fetcher from './fetcher';
import _ from 'lodash';

export const searchService = {
    getAll,
};

function getAll({tags, type, userId}) {
    const requestBody = {
        query: `
          query CreateUser($t: [String], $c: String, $u: String, $skip: Int, $limit: Int){
            sources(filter: {tags: $t, type: $c, creator: $u}, pagination: {skip: $skip, limit: $limit}){
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
            countSources(filter: {tags: $t, type: $c, creator: $u})
          }
          `,
          variables: {
            ..._.omitBy({
              t: tags,
              c: type,
              u: userId
            }, _.isEmpty),
            // skip: this.state.page*this.state.perPage,
            // limit: this.state.perPage,
          }
      };
  
      return fetcher(requestBody)
        .then(resData => {
            return resData.data
        })
}