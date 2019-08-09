import { searchConstants } from '../_constants';
import { searchService } from '../_services';

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
        console.log("jos",tags)
        searchService.getAll({
            tags,
            type
        })
            .then((data) => {
                dispatch(success(data))
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

function addType(_id) {
    return dispatch => {

        dispatch({ type: searchConstants.ADD_TYPE, _id });
        dispatch(search())
    };
}

