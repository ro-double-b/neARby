import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './app/containers/App';
import reducers from './app/reducers/root-reducer';

const store = createStore(reducers);

class neARby extends Component {
  render() {
    return (
      <Provider store={store}>
        <App store={store}/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('neARby', () => neARby);
