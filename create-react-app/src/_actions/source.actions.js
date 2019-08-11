import { sourceConstants } from '../_constants';
import { sourceService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { tagActions } from './tag.actions'
import { typeActions } from './type.actions'

export const sourceActions = {
    create,
    getSlug
};

function create(source) {
    return dispatch => {
        dispatch(request(source));

        return sourceService.create(source)
            .then(
                source => { 
                    dispatch(success());
                    dispatch(tagActions.getAll());
                    dispatch(typeActions.getAll());
                    history.push(`/post/${source.slug}`);
                },
                error => {
                    console.log("jancok",error)
                    dispatch(failure(error.errors));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(source) { return { type: sourceConstants.SOURCES_REQUEST, source } }
    function success(source) { return { type: sourceConstants.SOURCES_SUCCESS, source } }
    function failure(errors) { return { type: sourceConstants.SOURCES_FAILURE, errors } }
}

function getSlug(slug) {
    return dispatch => {
        dispatch(request());

        return sourceService.find({slug})
            .then(
                source => {
                    dispatch(success(source));
                    return source
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                    return error
                }
            );
    };

    function request() { return { type: sourceConstants.GET_SLUG_REQUEST } }
    function success(source) { return { type: sourceConstants.GET_SLUG_SUCCESS, source } }
    function failure(errors) { return { type: sourceConstants.GET_SLUG_FAILURE, errors } }
}