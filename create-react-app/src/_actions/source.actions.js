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

        sourceService.create(source)
            .then(
                source => { 
                    dispatch(success());
                    dispatch(tagActions.getAll());
                    dispatch(typeActions.getAll());
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(source) { return { type: sourceConstants.SOURCES_REQUEST, source } }
    function success(source) { return { type: sourceConstants.SOURCES_SUCCESS, source } }
    function failure(error) { return { type: sourceConstants.SOURCES_FAILURE, error } }
}

function getSlug(slug) {
    return dispatch => {
        dispatch(request());

        sourceService.find({slug})
            .then(
                source => { 
                    dispatch(success(source));
                    dispatch(tagActions.getAll());
                    dispatch(typeActions.getAll());
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: sourceConstants.SOURCES_REQUEST } }
    function success(source) { return { type: sourceConstants.SOURCES_SUCCESS, source } }
    function failure(error) { return { type: sourceConstants.SOURCES_FAILURE, error } }
}