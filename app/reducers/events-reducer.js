import { EVENTS_COLLECTION } from '../actions/index';

const initialState = {
  collection: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case EVENTS_COLLECTION:
      return { ...state,
      collection: action.payload }
    default:
      return state;
  }
}