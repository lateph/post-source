import { userConstants } from '../_constants';
import { userService, searchService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getProfile,
    getListArticle,
    updateProfile,
    delete: _delete
};

function getListArticle() {
    return (dispatch, getState) => {

        dispatch(request());

        // const { tags, type } = getState().search
        const { userId } = getState().authentication.user

        searchService.getAll({
            userId
            // tags,
            // type
        })
            .then((data) => {
                console.log("jancok1", data)
                dispatch(success(data))
            }).catch((data) => {
                failure(data)
            })
    };

    function request() { return { type: userConstants.GET_LIST_ARTICLE_REQUEST } }
    function success(listArticle) { return { type: userConstants.GET_LIST_ARTICLE_SUCCESS, listArticle } }
    function failure(error) { return { type: userConstants.GET_LIST_ARTICLE_FAILURE, error } }
}

function getProfile() {
    return (dispatch, getState)  => {
        dispatch(request());

        const { userId } = getState().authentication.user

        return userService.getProfile(userId)
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

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(source) { return { type: userConstants.GET_SUCCESS, source } }
    function failure(errors) { return { type: userConstants.GET_FAILURE, errors } }
}

function updateProfile(user){
    return (dispatch, getState) => {
        dispatch(request(user));

        const { userId } = getState().authentication.user

        return userService.updateProfile(userId, user)
            .then(
                user => { 
                    dispatch(success());
                    // history.push(`/post/${user.slug}`);
                },
                error => {
                    // console.log("jancok",error)
                    dispatch(failure(error.errors));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(user) { return { type: userConstants.GET_SUCCESS, user } }
    function failure(errors) { return { type: userConstants.GET_FAILURE, errors } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request());

        return userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    throw error
                }
            );
    };

    function request() { return { type: userConstants.LOGIN_REQUEST } }
    function success({ token }) { return { type: userConstants.LOGIN_SUCCESS, token } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    dispatch(successLogin(user));
                    history.push('/');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function successLogin({token}) { return { type: userConstants.LOGIN_SUCCESS, token } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => { 
                    dispatch(success(id));
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}