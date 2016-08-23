import { SEARCH_PHOTOS, GET_DIRECTIONS } from '../actions/index';

const initialState = {
  photos: [],
  directions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PHOTOS:
      return {
        ...state,
        photos: action.payload
      };
    case GET_DIRECTIONS:
      return {
        ...state,
        directions: action.payload
      };
    default:
      return state;
  }
}
