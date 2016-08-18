import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  MapView,
  ListView
} from 'react-native';
import FBSDK, { LoginButton } from 'react-native-fbsdk';
import styles from '../styles/style';
import { drawerState } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    console.log(this, 'USER');
  }

  handleSignout = () => {
    this.props.navigator.resetTo({name: 'Login'});
  }

  render() {
    return (
      <View style={styles.panel}>
      <Text style={styles.subheading}>{this.props.user.username}</Text>
      <Image source={{ uri: '"' + this.props.user.picture + '"'}}/>
      <MapView
        style={{flex: 1}}
        showsUserLocation={true}
        followUserLocation={true}
        />
      <Text style={{textAlign: 'center'}}>
      <LoginButton
        publishPermissions={["publish_actions"]}
        onLogoutFinished={this.handleSignout.bind(this)}/>
      </Text>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    drawer: state.drawer
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    action: bindActionCreators({ drawerState }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
