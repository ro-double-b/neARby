import { DRAWER_TYPE } from '../actions/index';

const initialState = {
  option: 'Search'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DRAWER_TYPE:
      return { ...state,
      option: action.payload.option
      };
    default:
      return state;
  }
}
