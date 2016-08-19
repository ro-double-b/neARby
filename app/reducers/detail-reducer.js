import { DETAIL_SELECTED } from '../actions/index';

const initialState = {
  selectedEvent: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DETAIL_SELECTED:
      return { ...state,
      selectedEvent: action.payload.selectedEvent,
      };
    default:
      return state;
  }
}
