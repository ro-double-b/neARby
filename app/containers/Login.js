import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillMount () {
    console.log(AccessToken);
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
         this.goToHomePage();
        }
       }
    );
  }
  goToHomePage(accessToken) {
    this.props.navigator.replace({name: 'Main'});
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.text}>ne</Text>
      <Text style={styles.textAR}>ar</Text>
      <Text style={styles.text}>by</Text>
      </View>
       <LoginButton
        style={styles.button}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert('login has error: ' + result.error);
            } else if (result.isCancelled) {
              alert('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  this.goToHomePage();
                }
              );
            }
          }
        }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 250,
    paddingTop: 250
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#3B5998'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    fontSize: 60,
    fontFamily: 'AvenirNext-UltraLight'
  },
  textAR: {
    fontSize: 60,
    fontFamily: 'AvenirNext-Medium'
  }
});

export default Login;
