import { PLACES_COLLECTION } from '../actions/index';
import { SEARCH_PLACES } from '../actions/index';
import { USER_PLACES } from '../actions/index';
import { USER_EVENTS } from '../actions/index';

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
  userPlacesUpdate: false,
  userEventsUpdate: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLACES_COLLECTION:
      return {
        ...state,
        places: action.payload
      };
    case SEARCH_PLACES:
    console.log(action.payload, 'place query');
      return {
        ...state,
        placeQuery: action.payload
      };
    case USER_PLACES:
      return {
        ...state,
        places: state.places.concat([action.payload]),
        userPlacesUpdate: true
      };
    case USER_EVENTS:
      return {
        ...state,
        places: state.places.concat([action.payload]),
        userEventsUpdate: true
      };
    default:
      return state;
  }
};
