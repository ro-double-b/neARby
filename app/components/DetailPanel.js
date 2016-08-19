import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Switch,
  ScrollView,  
  Text,
  Image
} from 'react-native';
import styles from '../styles/style';
import { drawerState, placeQuery, imageQuery } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PlacePanel extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <View style={styles.panel}>
        <Text>{this.props.detail.name}</Text>
        <Text>{this.props.detail.address}</Text>

            <ScrollView>
              <View>
              {this.props.photos.map(function(item, key) {
                return (
          <Image key={key} source={{uri: item}}
              style={{width: 275, height: 275,}} />
                  );
                })
              }
              </View>
        </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.placeOrEventButton}>
              <Text style={styles.buttonText}>Buy Tix</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.props.action.imageQuery(this.props.detail)}}>
              <Text style={styles.buttonText}>Get Direc</Text>
            </TouchableHighlight>
          </View>
      </View>
    );
  }
}



const mapStateToProps = function(state) {
  console.log('map state to props is called, this is state: ', state);
  return {
    detail: state.detail.selectedEvent,
    photos: state.photos.photos
  };
};

const mapDispatchToProps = function(dispatch) {
  console.log('map dispatch to props is called');
  return {
    action: bindActionCreators({ drawerState, placeQuery, imageQuery}, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PlacePanel);