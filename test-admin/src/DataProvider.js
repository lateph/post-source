// in src/dataProvider
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';
// import _ from 'lodash';

const API_URL = process.env.REACT_APP_URL

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        console.log(params)
        var requestBody = {};
        console.log(resource)
        if(resource === "sources"){
            requestBody = {
                query: `
                  query CreateUser($t: String){
                    sources(filter: {tags: $t}){
                      _id
                      title
                      shortDesc
                      createdAt
                      slug
                      thumb
                      file
                      creator{
                        email
                        firstName
                        lastName
                      }
                    }
                    countSources(filter: {tags: $t})
                  }
                  `,
                  variables: {}
              };
        }
        else if(resource === "users"){
            requestBody = {
                query: `
                  query CreateUser($t: String){
                    users(filter: {firstName: $t}){
                        _id
                        firstName
                        lastName
                        email
                    }
                    countUsers(filter: {firstName: $t})
                  }
                  `,
                  variables: {}
              };
        }
        return { 
            url: `${API_URL}`,
            options: { method: 'POST', body: JSON.stringify(requestBody) }
        };
    }
    case GET_ONE:
        console.log(params)
        if(resource === "sources"){
            requestBody = {
                query: `
                    query CreateUser($t: String){
                        source(filter: {tags: $t}){
                            _id
                            title
                            shortDesc
                            createdAt
                            slug
                            thumb
                            file
                            creator{
                            email
                            firstName
                            lastName
                        }
                    }
                    `,
                    variables: {}
                };
        }
        else if(resource === "users"){
            requestBody = {
                query: `
                    query CreateUser($id: ID!){
                        user(_id: $id){
                            _id
                            firstName
                            lastName
                            email
                        }
                    }
                    `,
                    variables: {
                        id: params.id
                    }
                };
        }
        return { 
            url: `${API_URL}`,
            options: { method: 'POST', body: JSON.stringify(requestBody) }
        };
    case GET_MANY: {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
        console.log("params", params)
        return
        if(resource === "sources"){
            requestBody = {
                query: `
                    query CreateUser($t: String){
                        source(filter: {tags: $t}){
                            _id
                            title
                            shortDesc
                            createdAt
                            slug
                            thumb
                            file
                            creator{
                            email
                            firstName
                            lastName
                        }
                    }
                    `,
                    variables: {}
                };
        }
        else if(resource === "users"){
            requestBody = {
                query: `
                    query CreateUser($id: ID!, $firstName: String, $lastName: String){
                        updateUser(_id: $id, input: {firstName: $firstName, lastName: $lastName}){
                            _id
                            firstName
                            lastName
                            email
                        }
                    }
                    `,
                    variables: {
                        ...params.data,
                        id: params.id
                    }
                };
        }
        return { 
            url: `${API_URL}`,
            options: { method: 'POST', body: JSON.stringify(requestBody) }
        };
    case CREATE:
        return {
            url: `${API_URL}/${resource}`,
            options: { method: 'POST', body: JSON.stringify(params.data) },
        };
    case DELETE:
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: { method: 'DELETE' },
        };
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} Data Provider response
 */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { headers, json } = response;
    console.log(json)
    switch (type) {
    case GET_LIST:
        return {
            data: json.data[resource].map(resource => ({ ...resource, id: resource._id }) ),
            total: json.data[`count${capitalize(resource)}`],
        };
    case GET_ONE:
        const r = resource.substring(0, resource.length - 1);
        return { data: { ...json.data[r], id: json.data[r].id } };
    case CREATE:
        return { data: { ...params.data, id: json.id } };
    default:
        return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};