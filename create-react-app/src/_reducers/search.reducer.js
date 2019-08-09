import { searchConstants } from '../_constants';
import { stat } from 'fs';

export function search(state = {
  loading: false,
  count: 0,
  tags: [],
  type: "",
  sources: []
}, action) {
  switch (action.type) {
    case searchConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case searchConstants.GETALL_SUCCESS:
      return {
        ...state,
        count: action.data.countSources,
        sources: action.data.sources,
        loading: false
      };
    case searchConstants.GETALL_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case searchConstants.ADD_TAG:
      const included = state.tags.indexOf(action._id)
      return {
        ...state,
        tags: included > -1 ? state.tags.filter(item => item !==action._id) : [
          ...state.tags,
          action._id
        ]
      };
    case searchConstants.ADD_TYPE:
      return {
        ...state,
        type: action._id == state.type ? '' : action._id
      };
    default:
      return state
  }
}