import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { types } from './types.reducer';
import { tags } from './tags.reducer';
import { sources } from './sources.reducer';
import { search } from './search.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  types,
  tags,
  sources,
  search
});

export default rootReducer;