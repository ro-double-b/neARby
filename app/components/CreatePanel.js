import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableHighlight,
  Slider
} from 'react-native';
import styles from '../styles/style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';

//TODOs:
//add color selector for geometry and a color state, fix timestamp on ev  ent request obj
//implement rating on detail view for user generated content, every time a rating is made, will send post request to server
//implement edit view, which let user remove the obj
//show countdown on obj

class CreatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createType: 'place',
      placeName: '',
      placeDescription: '',
      eventName: '',
      eventDescription: '',
      startTime: '',
      duration: '',
    };
  }

  resetState() {
    this.setState({
      createType: 'place',
      placeName: '',
      placeDescription: '',
      eventName: '',
      eventDescription: '',
      startTime: '',
      duration: '',
    });
  }

  handleSubmitPlace() {
    let obj = {
      name: this.state.placeName,
      description: this.state.placeDescription,
      latitude: this.props.currentPosition.latitude,
      longitude: this.props.currentPosition.longitude,
      lat: this.props.threeLat,
      lon: this.props.threeLon,
      distance: this.props.distance,
      username: this.props.username,
      type: 'userPlace'
    };

    // sendSpotToServer('createPlace', obj);
    this.props.action.addPlace(obj);
    this.resetState();
    this.props.close();
  }

  handleSubmitEvent() {
    let obj = {
      name: this.state.eventName,
      description: this.state.eventDescription,
      latitude: this.props.currentPosition.latitude,
      longitude: this.props.currentPosition.longitude,
      startTime: this.props.startTime,
      username: this.props.username,
      lat: this.props.threeLat,
      lon: this.props.threeLon,
      distance: this.props.distance,
      type: 'userEvent'
    };

    // sendSpotToServer('createEvent', obj);
    this.props.action.addEvent(obj);
    this.resetState();
    this.props.close();
  }

  startTimeSlider(value) {
    let timeNow = new Date();
    let hour = timeNow.getHours();
    let suffix = (hour > 12) ? 'PM' : 'AM';

    let eventStartTime = (value / 2 + hour) % 12;
    let eventStartHr = Math.floor(eventStartTime);
    let eventStartMinute = Math.floor((eventStartTime % 1) * 60);
    if (eventStartMinute === 0) {
      eventStartMinute = '00';
    }
    this.setState({
      startTime: eventStartHr + ':' + eventStartMinute + suffix
    });
  }

  switchType(type) {
    this.setState({createType: type});
  }

  renderForm() {
    if (this.state.createType === 'place') {
      return (
        <View>
          <Text style={styles.inputLable}>Place Name</Text>
          <TextInput style={styles.textInput}  onChangeText={(text) => this.setState({placeName: text})} value={this.state.placeName} placeholder="place name" />
          <Text style={styles.inputLable}>Place Description</Text>
          <TextInput style={styles.textInput}  onChangeText={(text) => this.setState({placeDescription: text})} value={this.state.placeDescription} placeholder="place description" />
          <Text style={styles.inputLable}>upload picture placeHolder</Text>
          <TouchableHighlight style={styles.createButton} onPress={() => { this.handleSubmitPlace(); }}>
            <Text style={styles.buttonText}>add spots</Text>
          </TouchableHighlight>
        </View>
      );

    } else if (this.state.createType === 'event') {
      return (
        <View>
          <Text style={styles.inputLable}>Event Name</Text>
          <TextInput style={styles.textInput}  onChangeText={(text) => this.setState({eventName: text})} value={this.state.eventName} placeholder="event name" />
          <Text style={styles.inputLable}>Event Description</Text>
          <TextInput style={styles.textInput}  onChangeText={(text) => this.setState({eventDescription: text})} value={this.state.eventDescription} placeholder="event description" />
          <Text style={styles.inputLable}>Event Start In: {this.state.startTime}</Text>
          <Slider
            {...this.props}
            onValueChange={(value) => {this.startTimeSlider(value)} }
            minimumValue={0}
            maximumValue={5}
            step={1} />
          <Text style={styles.inputLable2}>upload picture placeHolder</Text>
          <TouchableHighlight style={styles.createButton} onPress={() => { this.handleSubmitEvent(); }}>
            <Text style={styles.buttonText}>add spots</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.panel}>
        <Text style={styles.headingSmall}>make a spot</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {this.switchType('place')} }>
            <View style={styles.iconRow}>
              <Image style={styles.icons} source={require('../assets/cube_small.gif')}/>
              <Text style={styles.textCenter} >place</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {this.switchType('event')} }>
            <View style={styles.iconRowEnd}>
              <Image style={styles.icons} source={require('../assets/cube_small.gif')}/>
              <Text style={styles.textCenter} >event</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.renderForm()}
      </View>
    );
  }
};

const sendSpotToServer = (type, obj) => {
  // let uri = 'http://10.6.23.239:3000/';
  let uri = 'https://agile-peak-45133.herokuapp.com';
  let endPoint;

  if (type === 'createPlace') {
    console.log('creating place: ', obj);
    endPoint = 'createPlace';
  } else if (type === 'createEvent') {
    console.log('creating event: ', obj);
    endPoint = 'createEvent';
  }

  fetch(uri + endPoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  })
  .then(function(response) {
    if (response.status === 200) {
      return response.json();
    } else  {
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
  });
};

const mapStateToProps = function(state) {
  return {
    username: state.user.username,
    initialPosition: state.Geolocation.initialPosition,
    currentPosition: state.Geolocation.currentPosition,
    threeLat: state.Geolocation.threeLat,
    threeLon: state.Geolocation.threeLon,
    distance: state.Geolocation.distance
  };
};

const mapDispatchToProps = function(dispatch) {
  return { action: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePanel);
