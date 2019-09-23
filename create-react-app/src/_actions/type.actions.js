import { typeConstants } from '../_constants';
import { typeService } from '../_services';

export const typeActions = {
    getAll,
};

function getAll() {
    return dispatch => {
        dispatch(request());

        return typeService.getAll()
            .then((types) => {
                dispatch(success(types))
            })
    };

    function request() { return { type: typeConstants.GETALL_REQUEST } }
    function success(types) { return { type: typeConstants.GETALL_SUCCESS, types } }
    // function failure(error) { return { type: typeConstants.GETALL_FAILURE, error } }
}
