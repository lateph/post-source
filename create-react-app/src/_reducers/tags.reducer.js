import { tagConstants } from '../_constants';

export function tags(state = {
  loading: false,
  items: []
}, action) {
  switch (action.type) {
    case tagConstants.GETALL_REQUEST:
      return {
        loading: true,
        items: []
      };
    case tagConstants.GETALL_SUCCESS:
      return {
        items: action.tags,
        loading: false
      };
    case tagConstants.GETALL_FAILURE:
      return {
        items: [],
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}