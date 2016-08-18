import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Switch,
  Slider,
  Text,
} from 'react-native';
import styles from '../styles/style';

class SearchPanel extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.panel}>
        <Text style={styles.heading}>search</Text>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.setState({drawerItem: 'Places'}); }}>
            <Text style={styles.buttonText}>places</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.setState({drawerItem: 'Events'}); }}>
            <Text style={styles.buttonText}>events</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default SearchPanel;
