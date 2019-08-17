import { sourceConstants } from '../_constants';

export function sources(state = {
  loading: false,
  source: false,
  errors: []
}, action) {
  switch (action.type) {
    case sourceConstants.SOURCES_REQUEST:
      return {
        ...state,
        loading: true,
        errors: []
      };
    case sourceConstants.SOURCES_SUCCESS:
      return {
        loading: true,
        source: action.source,
        errors: []
      };
    case sourceConstants.SOURCES_FAILURE:
      return {
        loading: false,
        source: false,
        errors: action.errors
      };

    case sourceConstants.GET_SLUG_REQUEST:
      return {
        loading: true,
        source: false,
        errors: []
      };
    case sourceConstants.GET_SLUG_SUCCESS:
      return {
        loading: false,
        source: action.source,
        errors: []
      };
    case sourceConstants.GET_SLUG_FAILURE:
      return {
        loading: false,
        source: false,
        errors: []
      };
    default:
      return state
  }
}