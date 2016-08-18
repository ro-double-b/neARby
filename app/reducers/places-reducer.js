import { PLACES_COLLECTION } from '../actions/index';
console.log(PLACES_COLLECTION, 'PLACES_COLLECTION');

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
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLACES_COLLECTION:
      return {
        ...state,
        testState: action.payload
      };
    default:
      return state;
  }
}
