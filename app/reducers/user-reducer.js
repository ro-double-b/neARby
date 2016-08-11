import SET_USER from '../actions/index';

const initialState = {
  collection: []
};

export default function(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_USER:
    console.log('in user reducer');
    console.log(action.payload);
      return { ...state,
      collection: action.payload };
    default:
      return state;
  }
};