import { sourceConstants } from '../_constants';

export function sources(state = {
  loading: true,
  source: false,
}, action) {
  switch (action.type) {
    case sourceConstants.CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case sourceConstants.CREATE_SUCCESS:
      return {
        loading: true,
        source: action.source
      };
    case sourceConstants.CREATE_FAILURE:
      return {
        loading: false,
        source: false
      };

    case sourceConstants.GET_SLUG_REQUEST:
      return {
        loading: true,
        source: false
      };
    case sourceConstants.GET_SLUG_SUCCESS:
      return {
        loading: false,
        source: action.source
      };
    case sourceConstants.GET_SLUG_FAILURE:
      return {
        loading: false,
        source: false
      };
    default:
      return state
  }
}