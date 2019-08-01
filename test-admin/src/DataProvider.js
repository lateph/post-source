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
import diff from 'object-diff';

const API_URL = process.env.REACT_APP_API_URL;

/**
 * @param {String} type One of the constants appearing at the top of this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The Data Provider request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertDataProviderRequestToHTTP = (type, resource, params) => {
    console.log(params)
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: order == "DESC" ? `-${field}` : field,
            // limit: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            limit: perPage,
            skip:  (page - 1) * perPage,
            filter: JSON.stringify(params.filter),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` , options:{}};
    }
    case GET_ONE:
        return { url: `${API_URL}/${resource}/${params.id}` , options:{}};
    case GET_MANY: {
        const query = {
            query: JSON.stringify({ _id: {$in: params.ids} }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}`, options:{} };
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}`, options:{} };
    }
    case UPDATE:
        const data = params.previousData ? diff(params.previousData, params.data) : params.data;
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: { method: 'PATCH', body: JSON.stringify(data) },
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
    console.log("data",response)
    switch (type) {
    case DELETE:
        return {
            data: {
            'id': params.id
            }
        };
    case GET_ONE:
        return {
            data: {
                ...json,
                'id': json._id
            }
        };
    case CREATE:
        return {
            data: {
                ...json,
                'id': json._id
            }
        };
    case UPDATE:
        return {
            data: {
                ...json,
                'id': json._id
            }
        };
    case GET_MANY:
        return {
            data: json.map(x => ({
                ...x,
                'id': x._id
            })),
            total: parseInt(headers.get('X-Total-Count')),
        };
    case GET_LIST:
        console.log(headers.get('X-Total-Count'))
        return {
            data: json.map(x => ({
                ...x,
                'id': x._id
            })),
            total: parseInt(headers.get('X-Total-Count')),
        };
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
    const token = localStorage.getItem('token');
    console.log(options)
    if(token && token !== "undefined"){
        if (!options.headers) {
            options.headers = new Headers({ 
                Accept: 'application/json', 
            });
        }
        options.headers.set('Authorization', `Bearer ${token}`);
        // options.headers = {
        //     'Authorization': `Bearer ${token}`
        // };
    }
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};