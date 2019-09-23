import { homeConstants } from '../_constants';
import { homeService } from '../_services';

export const homeActions = {
    load,
};

function load() {
    return dispatch => {
        dispatch(request());

        homeService.load()
            .then((data) => {
                console.log("jancok",data)
                dispatch(success(data))
            })
    };

    function request() { return { type: homeConstants.GETALL_REQUEST } }
    function success(data) { return { type: homeConstants.GETALL_SUCCESS, data } }
    // function failure(error) { return { type: typeConstants.GETALL_FAILURE, error } }
}
