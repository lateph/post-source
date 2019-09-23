import { searchConstants } from '../_constants';
import { searchService } from '../_services';
import { tagActions } from './tag.actions'
import { typeActions } from './type.actions'
import _ from 'lodash';
import queryString from 'query-string';

export const searchActions = {
    search,
    addTag,
    addType,
    addSearch,
    changePage,
    changePerPage,
    addTags,
    loadSearch
    // setType,
};

function loadSearch(){
    return (dispatch, getState) => {
        const v = queryString.parse(getState().router.location.search, {arrayFormat: 'index'})
        dispatch(addSearch(v.q))
        Promise.all([ dispatch(addTags(v.tags ? v.tags : [])), dispatch(addType(v.type))]).then(function(values) {
            dispatch(search())
        });
    };
}

function search() {
    return (dispatch, getState) => {

        dispatch(request());

        const { tags, type, perPage, page, q } = getState().search
        searchService.getAll({
            tags,
            type,
            perPage,
            page,
            q
        })
            .then((data) => {
                dispatch(success(data))
            }).catch(e => {
                failure(e)
            })
    };

    function request() { return { type: searchConstants.GETALL_REQUEST } }
    function success(data) { return { type: searchConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.GETALL_FAILURE, error } }
}

function addTag(_id, apply=true) {
    return dispatch => {
        dispatch({ type: searchConstants.ADD_TAG, _id });
        if(apply){
            dispatch(search())
        }
    };
}

function addTags(names) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) =>  {
            if( getState().tags.items.length > 0){
                const _ids = _.map(_.filter(getState().tags.items, (o) => _.find(names, (n) =>  n == o.name)), (m) => m._id);
                dispatch({ type: searchConstants.ADD_TAGS, _ids });
                resolve(true)
            }
            else{
                dispatch(tagActions.getAll()).then(() => {
                    const _ids = _.map(_.filter(getState().tags.items, (o) => _.find(names, (n) =>  n == o.name)), (m) => m._id);
                    dispatch({ type: searchConstants.ADD_TAGS, _ids });
                    resolve(true)
                })
            }
        });  
    };
}

function addSearch(q) {
    return dispatch => {

        dispatch({ type: searchConstants.ADD_SEARCH, q });
        dispatch(search())
    };
}

function changePage(page) {
    return dispatch => {

        dispatch({ type: searchConstants.CHANGE_PAGE, page });
        dispatch(search())
    };
}

function changePerPage(perPage) {
    return dispatch => {

        dispatch({ type: searchConstants.CHANGE_PER_PAGE, perPage });
        dispatch(search())
    };
}

function addType(name) {
    console.log("add", name)
    return (dispatch, getState) => {
        return new Promise((resolve, reject) =>  {
            if( getState().types.items.length > 0){
                console.log("type 1")
                const type = _.find(getState().types.items, (n) =>  n.name == name)
                if(type){
                    console.log(type)
                    const _id = type._id
                    dispatch({ type: searchConstants.ADD_TYPE, _id });
                }
                resolve(true)
            }
            else{
                dispatch(typeActions.getAll()).then(() => {
                    console.log("type 2", getState().types.items)
                    const type = _.find(getState().types.items, (n) =>  n.name == name)
                    if(type){
                        console.log(type)
                        const _id = type._id
                        dispatch({ type: searchConstants.ADD_TYPE, _id });
                    }                   
                    resolve(true)
                })
            }
        });  
    };
}

