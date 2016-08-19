import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableHighlight,
  Slider
} from 'react-native';
import styles from '../styles/style';

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

  handleSubmitPlace() {
    //make post request to register cube
    // this.props.close();
  }

  handleSubmitEvent() {
    //make post request to register cube
    // this.props.close();
  }

  startTimeSlider(value) {
    let timeNow = new Date();
    let hour = timeNow.getHours();
    let suffix = (hour > 12) ? 'PM' : 'AM';

    let eventStartTime = (value / 2 + hour) % 12;
    let eventStartHr = Math.floor(eventStartTime);
    let eventStartMinute = Math.floor((eventStartTime % 1) * 60);
    if (eventStartMinute === 0) {
      eventStartMinute = '00'
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
          <Text style={styles.inputLable}>upload picture placeHolder</Text>
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


export default CreatePanel;
