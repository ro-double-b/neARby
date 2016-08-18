import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Switch,
  Slider,
  Text,
} from 'react-native';
import styles from '../styles/style';


const EventPanel = ({props}) => {
  <View style={styles.panel}>
    <Text style={styles.heading}>events</Text>
    <TextInput style={styles.textInput} onChangeText={(text) => this.setState({eventSearch: text})} value={this.state.eventSearch} placeholder='Search Events'></TextInput>
    <Text style={styles.subheading}>I want events happening ...</Text>
    <Text style={styles.text}>{this.renderSliderValue()}</Text>
    <Slider
      {...this.props}
      onValueChange={(value) => this.setState({sliderValue: value})}
      minimumValue={1}
      maximumValue={7}
      step={1} />
    <Text style={styles.subheading}>Event Type</Text>
    <View style={styles.switchTable}>
      <View style={styles.switchColumn}>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({businessEvent: value})}
            value={this.state.businessEvent} />
          <Text style={styles.switchText}>Business</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({familyEvent: value})}
            value={this.state.familyEvent} />
          <Text style={styles.switchText}>Family</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({comedyEvent: value})}
            value={this.state.comedyEvent} />
          <Text style={styles.switchText}>Comedy</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({festivalEvent: value})}
            value={this.state.festivalEvent} />
          <Text style={styles.switchText}>Festivals</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({sportsEvent: value})}
            value={this.state.sportsEvent} />
          <Text style={styles.switchText}>Sports</Text>
        </View>
      </View>
      <View style={styles.switchColumn}>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({musicEvent: value})}
            value={this.state.musicEvent} />
          <Text style={styles.switchText}>Music</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({socialEvent: value})}
            value={this.state.socialEvent} />
          <Text style={styles.switchText}>Social</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({filmEvent: value})}
            value={this.state.filmEvent} />
          <Text style={styles.switchText}>Film</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({artEvent: value})}
            value={this.state.artEvent} />
          <Text style={styles.switchText}>Art</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({sciTechEvent: value})}
            value={this.state.sciTechEvent} />
          <Text style={styles.switchText}>Sci/Tech</Text>
        </View>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.setState({drawerItem: 'Search'}); }}>
        <Text style={styles.buttonText}>go back</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.eventSearch() }}>
        <Text style={styles.buttonText}>submit</Text>
      </TouchableHighlight>
    </View>
  </View>
};

export default EventPanel;