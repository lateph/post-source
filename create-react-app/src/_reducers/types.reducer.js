import { typeConstants } from '../_constants';

export function types(state = {
  loading: false,
  items: []
}, action) {
  switch (action.type) {
    case typeConstants.GETALL_REQUEST:
      return {
        loading: true,
        items: []
      };
    case typeConstants.GETALL_SUCCESS:
      return {
        items: action.types,
        loading: false
      };
    case typeConstants.GETALL_FAILURE:
      return {
        items: [],
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}