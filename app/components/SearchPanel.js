import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import styles from '../styles/style';
import { drawerState } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    console.log(this, 'search')
  }

  render() {
    return (
      <View>
        <Text style={styles.heading}>search</Text>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.props.action.drawerState('Places'); }}>
            <Text style={styles.buttonText}>places</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.placeOrEventButton} onPress={() => { this.props.action.drawerState('Events'); }}>
            <Text style={styles.buttonText}>events</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    action: bindActionCreators({ drawerState }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
