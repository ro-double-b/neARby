import { combineReducers } from 'redux';
import places from './places-reducer';
import user from './user-reducer';

const rootReducer = combineReducers({
  places: places,
  user: user
});

export default rootReducer;