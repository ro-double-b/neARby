import { UPDATE_COORDINATES } from '../actions/index';

const initialState = {
  latitude: 0,
  longitude: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_COORDINATES:
      return { ...state,
      collection: action.payload }
    default:
      return state;
  }
}