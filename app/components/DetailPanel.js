import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  MapView,
  ScrollView,
  Text,
  Image
} from 'react-native';
import styles from '../styles/style';
import { drawerState, placeQuery } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PlacePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null
    }
  }



  render() {
    return (
      <View style={styles.panel}>


        <Text style={styles.subheading}>{this.props.detail.name}</Text>
        <Text style={styles.subheading}>{this.props.detail.address}</Text>

        <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            {this.props.photos.map(function(item, key) {
              return (
                <Image key={key} source={{uri: item}} style={styles.images} />
                );
              })
            }
          </View>
        </ScrollView>
        
        <View>
          {this.props.directions.map(function(item, key) {
            return (
              <Text>{item}</Text>
              );
            }.bind(this))
          }
        </View>

        <MapView
          style={{
            height: 250, margin: 20
          }}
          showsUserLocation={true}
          region={{
            latitude: this.props.detail.realLat,
            longitude: this.props.detail.realLon,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.00421,
          }}
        />

      </View>
    );
  }

}



const mapStateToProps = function(state) {
  return {
    detail: state.detail.selectedEvent,
    photos: state.photos.photos,
    directions: state.directions.directions,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    action: bindActionCreators({ drawerState, placeQuery}, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PlacePanel);