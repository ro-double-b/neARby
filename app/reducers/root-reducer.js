import { combineReducers } from 'redux';
import places from './places-reducer';

const rootReducer = combineReducers({
  places: places
});

export default rootReducer;