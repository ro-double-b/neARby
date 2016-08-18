import { SET_USER } from '../actions/index';

const initialState = {
  username: '',
  picture: ''
};

export default function(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_USER:
    console.log('in user reducer');
    console.log(action.payload);
      return { ...state,
      username: action.payload.username,
      picture: action.payload.picture };
    default:
      return state;
  }
};
