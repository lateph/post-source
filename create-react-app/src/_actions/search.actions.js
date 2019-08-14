import { searchConstants } from '../_constants';
import { searchService } from '../_services';
import { fail } from 'assert';

export const searchActions = {
    search,
    addTag,
    addType,
    // setType,
};

function search() {
    return (dispatch, getState) => {

        dispatch(request());

        const { tags, type } = getState().search
        searchService.getAll({
            tags,
            type
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

function addTag(_id) {
    return dispatch => {

        dispatch({ type: searchConstants.ADD_TAG, _id });
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

function addType(_id) {
    return dispatch => {

        dispatch({ type: searchConstants.ADD_TYPE, _id });
        dispatch(search())
    };
}

