import { SEARCH_PHOTOS } from '../actions/index';

const initialState = {
  photos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_PHOTOS:
      return {
        ...state,
        photos: action.payload
      };
    default:
      return state;
  }
}