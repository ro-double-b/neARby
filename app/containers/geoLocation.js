import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class getGeolocation extends Component {

  constructor() {
    super();

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      watchID: null
    };
  }

  componentDidMount() {
    console.log('navigator.geolocation', navigator.geolocation);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    let watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
        console.log('position', position);
      },
      (error) => console.log(error.message)
    );

    console.log('watchID', watchID);
    this.setState({
      watchID: watchID
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    navigator.geolocation.clearWatch(this.state.watchID);
  }

  render() {
    console.log('rendering');
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  preview: {
    flex: 1
  }
});

export default getGeolocation;
