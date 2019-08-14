import { userConstants } from '../_constants';

export function users(state = {
  loading: false,
  errors: [],
  user: {},
  listArticle: []
}, action) {
  switch (action.type) {
    case userConstants.GET_REQUEST:
      return {
        ...state,
        loading: true,
        errors: [],
        user: {}
      };
    case userConstants.GET_SUCCESS:
      return {
        ...state,
        user: action.users,
        loading: false,
        errors: []
      };
    case userConstants.GET_FAILURE:
      return { 
        ...state,
        errors: action.errors,
        loading: false,
      };
      case userConstants.GET_LIST_ARTICLE_REQUEST:
        return {
          ...state,
          listArticle: [],
          loading: true,
        };
      case userConstants.GET_LIST_ARTICLE_SUCCESS:
        return {
          ...state,
          loading: false,
          listArticle: action.listArticle.sources
        };
      case userConstants.GET_LIST_ARTICLE_FAILURE:
        return { 
          ...state,
          loading: false,
          listArticle: []
        };
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}