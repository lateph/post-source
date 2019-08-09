import { sourceConstants } from '../_constants';

export function sources(state = {}, action) {
  switch (action.type) {
    case sourceConstants.CREATE_REQUEST:
      return {
        loading: true,
        // source: action.source
      };
    case sourceConstants.CREATE_SUCCESS:
      return {
        loading: true,
        source: action.source
      };
    case sourceConstants.CREATE_FAILURE:
      return {};
    default:
      return state
  }
}