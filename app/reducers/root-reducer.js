import { combineReducers } from 'redux';
import places from './places-reducer';
import user from './user-reducer';
import drawer from './drawer-reducer';

const rootReducer = combineReducers({
  places: places,
  // user: user,
  drawer: drawer
});

export default rootReducer;