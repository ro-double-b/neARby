/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  Navigator
} from 'react-native';
import { mainView } from './app/containers/mainView';

const ROUTES = {
  mainView: mainView
}

const TITLES = {
  mainView: 'Main'
}

class neARby extends Component {
  constructor(props) {
    super(props);
  }
  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return (
      <Component
      route={route}
      navigator={navigator} />
    );
  }
  render() {
    return (
      <Navigator initialRoute={{ name: 'mainView', index: 0 }}
        style={ styles.container }
        renderScene={ this.renderScene.bind(this) }
        configureScene={ () => {return Navigator.SceneConfigs.FloatFromRight} } />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('neARby', () => neARby);
