import { homeConstants } from '../_constants';

export function home(state = {
  loading: false,
  free: [],
  trial: [],
  paid: [],
}, action) {
  switch (action.type) {
    case homeConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case homeConstants.GETALL_SUCCESS:
      return {
        free: [...action.data.free],
        trial: [...action.data.trial],
        paid: [...action.data.paid],
        loading: false,
      };
    case homeConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}