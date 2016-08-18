import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Switch,
  Slider,
  Text,
} from 'react-native';
import styles from '../styles/style';

const PlacePanel = ({props}) => {
  <View style={styles.panel}>
    <Text style={styles.heading}>places</Text>
    <TextInput style={styles.textInput}  onChangeText={(text) => this.setState({placeSearch: text})} value={this.state.placeSearch} placeholder='Search Places'></TextInput>
    <Text style={styles.subheading}>Place Type</Text>
    <View style={styles.switchTable}>
      <View style={styles.switchColumn}>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({foodPlace: value})}
            value={this.state.foodPlace} />
          <Text style={styles.switchText}>Food</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({hotelPlace: value})}
            value={this.state.hotelPlace} />
          <Text style={styles.switchText}>Hotels</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({cafesPlace: value})}
            value={this.state.cafesPlace} />
          <Text style={styles.switchText}>Cafes</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({nightlifePlace: value})}
            value={this.state.nightlifePlace} />
          <Text style={styles.switchText}>Nightlife</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({shoppingPlace: value})}
            value={this.state.shoppingPlace} />
          <Text style={styles.switchText}>Shopping</Text>
        </View>
      </View>
      <View style={styles.switchColumn}>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({publicTransit: value})}
            value={this.state.publicTransit} />
          <Text style={styles.switchText}>Public Transit</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({bankPlace: value})}
            value={this.state.bankPlace} />
          <Text style={styles.switchText}>Bank/ATM</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({gasStationPlace: value})}
            value={this.state.gasStationPlace} />
          <Text style={styles.switchText}>Gas Stations</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({parkingPlace: value})}
            value={this.state.parkingPlace} />
          <Text style={styles.switchText}>Parking</Text>
        </View>
        <View style={styles.switch}>
          <Switch
            onTintColor='#009D9D'
            onValueChange={(value) => this.setState({parkPlace: value})}
            value={this.state.parkPlace} />
          <Text style={styles.switchText}>Parks</Text>
        </View>
      </View>
    </View>
    <View style={styles.buttonContainer}>
      <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.setState({drawerItem: 'Search'}); }}>
        <Text style={styles.buttonText}>go back</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.placeSearch(); }}>
        <Text style={styles.buttonText}>submit</Text>
      </TouchableHighlight>
    </View>
  </View>
};

export default PlacePanel;