import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose (
      // ReduxPromise allows for async calls to server/database
      applyMiddleware(ReduxPromise)
    )
  );

  return store;
};