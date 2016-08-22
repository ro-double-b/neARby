import { PLACES_COLLECTION } from '../actions/index';
import { SEARCH_PLACES } from '../actions/index';
import { USER_PLACES } from '../actions/index';
import { USER_EVENTS } from '../actions/index';
import { RESET_PLACES_UPDATE } from '../actions/index';

const initialState = {
  places: [],
  placeQuery: {
    food: false,
    hotel: false,
    cafes: false,
    nightlife: false,
    shopping: false,
    publicTransit: false,
    bank: false,
    gasStation: false,
    parking: false,
    park: false,
    placeSearch: ''
  },
  placeUpdate: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLACES_COLLECTION:
      return {
        ...state,
        places: action.payload,
        placeUpdate: true
      };
    case SEARCH_PLACES:
    console.log(action.payload, 'place query');
      return {
        ...state,
        placeQuery: action.payload,
      };
    case USER_PLACES:
      return {
        ...state,
        places: state.places.concat([action.payload]),
        placeUpdate: true
      };
    case USER_EVENTS:
      return {
        ...state,
        places: state.places.concat([action.payload]),
        placeUpdate: true
      };
    case RESET_PLACES_UPDATE:
      return {
        ...state,
        placeUpdate: false
      };
    default:
      return state;
  }
};
