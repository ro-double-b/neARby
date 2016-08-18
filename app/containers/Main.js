import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Switch,
  Slider,
  Text,
} from 'react-native';
import styles from '../styles/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import FBSDK, { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import Drawer from 'react-native-drawer';
import ARview from './ARview';
import SearchPanel from '../components/SearchPanel';
import EventPanel from '../components/EventPanel';
import PlacePanel from '../components/PlacePanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const infoRequest = new GraphRequest(
      '/me?fields=name,picture',
      null,
      this.getUserInfo.bind(this)
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  componentDidMount() {
    this.props.action.drawerState('Places');
    // console.log(this.props.places, ' PLACES');
  }

  getUserInfo(err, data) {
    if (err) {
      console.log('ERR ', err);
    } else {
      this.setState({username: data.name,
        picture: data.picture.data.url});
      console.log('DATA - ', data.name + ' ' + data.picture.data.url);
    }
  }

  closeControlPanel = () => {
    this._drawer.close();
  }

  openControlPanel = () => {
    this._drawer.open();
  }

  handleSignout = () => {
    this.props.navigator.resetTo({name: 'Login'});
  }

  placeSearch = () => {
    let placeQuery = {
      food: this.state.foodPlace,
      hotel: this.state.hotelPlace,
      cafes: this.state.cafesPlace,
      nightlife: this.state.nightlifePlace,
      shopping: this.state.shoppingPlace,
      publicTransit: this.state.publicTransitPlace,
      bank: this.state.bankPlace,
      gasStation: this.state.gasStationPlace,
      parking: this.state.parkingPlace,
      park: this.state.parkPlace,
      placeSearch: this.state.placeSearch,
      latitude: 37.78375460769774,
      longitude: -122.4091061298944,
      threejsLat: 0,
      threejsLon: 0,
    };
  fetch('http://10.6.23.239:3000/places', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placeQuery)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    this.setState({
      placesEvents: data
    });
  }.bind(this));
  // .catch(function(error) {
  //   console.error(error);
  // });
  console.log(this.state.placesEvents);
    this._drawer.close();
    this.setState({
      foodPlace: false,
      hotelPlace: false,
      cafesPlace: false,
      nightlifePlace: false,
      shoppingPlace: false,
      publicTransitPlace: false,
      bankPlace: false,
      gasStationPlace: false,
      parkingPlace: false,
      parkPlace: false,
      placeSearchPlace: '',
      drawerItem: 'Search',
    });
  }

  getLocation = (obj) => {
    this.setState({
      latitude: obj.latitude,
      longitude: obj.longitude,
      threeLat: obj.threeLat,
      threeLon: obj.threeLon,
    });
  }

  getInitialLocation = (obj) => {
    this.setState({
      latitude: obj.latitude,
      longitude: obj.longitude,
      threeLan: obj.threeLat,
      threeLon: obj.threeLon,
    });
    // need to go and fetch the data from the server and set the places state
  }


  eventSearch = () => {
    console.log('calling eventsearch');
    let eventQuery = {
      business: this.state.businessEvent,
      family: this.state.familyEvent,
      comedy: this.state.comedyEvent,
      festival: this.state.festivalEvent,
      sports: this.state.sportsEvent,
      music: this.state.musicEvent,
      social: this.state.socialEvent,
      film: this.state.filmEvent,
      art: this.state.artEvent,
      sciTech: this.state.sciTechEvent,
      eventDays: this.state.sliderValue,
      eventSearch: this.state.eventSearch,
      latitude: 37.78375460769774,
      longitude: -122.4091061298944,
      threejsLat: 0,
      threejsLon: 0,
    };
    console.log(eventQuery, 'QUERY');
  fetch('http://10.6.23.239:3000/events', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventQuery)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    this.setState({
      placesEvents: data
    });
  }.bind(this));
  // .catch(function(error) {
  //   console.error(error);
  // });
    this._drawer.close();
    this.setState({
      businessEvent: false,
      familyEvent: false,
      comedyEvent: false,
      festivalEvent: false,
      sportsEvent: false,
      musicEvent: false,
      socialEvent: false,
      filmEvent: false,
      artEvent: false,
      sciTechEvent: false,
      eventDays: 1,
      eventSearch: ''
    });
  }

  placeSearch = () => {
    let placeQuery = {
      food: this.state.foodPlace,
      hotel: this.state.hotelPlace,
      cafes: this.state.cafesPlace,
      nightlife: this.state.nightlifePlace,
      shopping: this.state.shoppingPlace,
      publicTransit: this.state.publicTransitPlace,
      bank: this.state.bankPlace,
      gasStation: this.state.gasStationPlace,
      parking: this.state.parkingPlace,
      park: this.state.parkPlace,
      placeSearch: this.state.placeSearch
    };
  fetch('https://agile-peak-45133.herokuapp.com/places', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(placeQuery)
  })
  .then(function(response) {
    if (response.status === 200) {
      console.log(response);
      return response.json();
    } else  {
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
  });
    this._drawer.close();
    this.setState({
      foodPlace: false,
      hotelPlace: false,
      cafesPlace: false,
      nightlifePlace: false,
      shoppingPlace: false,
      publicTransitPlace: false,
      bankPlace: false,
      gasStationPlace: false,
      parkingPlace: false,
      parkPlace: false,
      placeSearchPlace: '',
      drawerItem: 'Search'
    });
  }

  eventSearch = () => {
    console.log('calling eventsearch');
    let eventQuery = {
      business: this.state.businessEvent,
      family: this.state.familyEvent,
      comedy: this.state.comedyEvent,
      festival: this.state.festivalEvent,
      sports: this.state.sportsEvent,
      music: this.state.musicEvent,
      social: this.state.socialEvent,
      film: this.state.filmEvent,
      art: this.state.artEvent,
      sciTech: this.state.sciTechEvent,
      eventDays: this.state.eventDays,
      eventSearch: this.state.eventSearch
    };
    console.log(eventQuery, 'QUERY');
  fetch('https://agile-peak-45133.herokuapp.com/events', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventQuery)
  })
  .then(function(response) {
    if (response.status === 200) {
      console.log(response);
      return response.json();
    } else  {
      console.log('error');
    }
  })
  .catch(function(error) {
    console.error(error);
  });
    this._drawer.close();
    this.setState({
      businessEvent: false,
      familyEvent: false,
      comedyEvent: false,
      festivalEvent: false,
      sportsEvent: false,
      musicEvent: false,
      socialEvent: false,
      filmEvent: false,
      artEvent: false,
      sciTechEvent: false,
      eventDays: 1,
      eventSearch: ''
    });
  }

  handleDrawer = (e) => {
    e.preventDefault();
    this.props.action.drawerState('Places');
  }

  renderSliderValue = () => {
    // if slidervalue is one return today
    const weekdays = {
      0: 'Sunday',
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
      7: 'Sunday',
      8: 'Monday',
      9: 'Tuesday',
      10: 'Wednesday',
      11: 'Thursday',
      12: 'Friday',
      13: 'Saturday'
    };
    let d = new Date();
    let dayOfWeek = d.getDay();

    if (this.state.sliderValue === 1) {
      return 'today';
    } else {
      return 'between today and ' + weekdays[dayOfWeek + this.state.sliderValue - 1];
    }
  }

  render() {
    let drawerItems;
    if (this.state.drawerItem === 'Search') {
        drawerItems = <SearchPanel />
    } else if (this.state.drawerItem === 'Events') {
      drawerItems = <EventPanel />
    } else if (this.state.drawerItem === 'List') {
      var content = this.state.placesEvents.map(function(item, key) {
        return (
            <Text key={key}>{item.name}</Text>
        );
      });
      drawerItems = <View style={styles.panel}>
        <Text style={styles.heading}>Places</Text>
            {content}
        <TouchableHighlight style={styles.placeOrEventButton}>
            <Text style={styles.buttonText}>More</Text>
          </TouchableHighlight>
        </View>
    } else if (this.state.drawerItem === 'Places') {
        drawerItems = <PlacePanel />
    } else {
      drawerItems = <View style={styles.panel}>
      <Text style={styles.heading}>under construction
      </Text>
             <Text style={{textAlign: 'center'}}><LoginButton
          publishPermissions={["publish_actions"]}
          onLogoutFinished={this.handleSignout.bind(this)}/></Text>
      </View>
    }

    return (
      <Drawer
        type="overlay"
        side="right"
        ref={(ref) => this._drawer = ref}
        content={drawerItems}
        panOpenMask={0.5}
        panCloseMask={0.2}
        tweenHandler={(ratio) => ({main: { opacity:(3-ratio)/3 }})}>
        <ARview
          pressProfile={() => {this.setState({drawerItem: 'Profile'}); this._drawer.open()}}
          pressSearch={() => {this.setState({drawerItem: 'Search'}); this._drawer.open()}}
          pressList={() => {this.setState({drawerItem: 'List'}); this._drawer.open()}}
          // mainViewGeoLocation={this.getInitialLocation.bind()}
          // mainViewSetLocation={this.getLocation.bind()}
          placesEvents={this.state.placesEvents}
        />
       </Drawer>
    );
  }
}

const mapStateToProps = function(state) {
  console.log('map state to props is called, this is state: ', state);
  return {
    places: state.places,
    // user: state.user
    drawer: state.drawer.option
  };
};

const mapDispatchToProps = function(dispatch) {
  console.log('map dispatch to props is called');
  return { action: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
