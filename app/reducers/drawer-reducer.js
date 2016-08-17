import { DRAWER_TYPE } from '../actions/index';
console.log(DRAWER_TYPE, 'DRAWER_TYPE');
const initialState = {
  option: 'Search' 
};

export default function(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case DRAWER_TYPE:
    console.log('in drawer reducer');
    console.log(action.payload);
      return { ...state,
      option: action.payload };
    default:
      return state;
  }
};