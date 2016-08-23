import { combineReducers } from 'redux';
import places from './places-reducer';
import user from './user-reducer';
import drawer from './drawer-reducer';
import detail from './detail-reducer';
import photos from './photo-reducer';
import Geolocation from './location-reducer';

const rootReducer = combineReducers({
  places: places,
  user: user,
  drawer: drawer,
  detail: detail,
  photos: photos,
  Geolocation: Geolocation
});

export default rootReducer;