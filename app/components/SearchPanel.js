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
    console.log(this, 'search');
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.heading}>search</Text>
        <View style={{alignItems: 'center', justifyContent: 'center', height: 400}}>
          <TouchableHighlight style={styles.searchButtons} onPress={() => { this.props.action.drawerState('Places'); }}>
            <Text style={styles.searchButtonText}>places</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.searchButtons} onPress={() => { this.props.action.drawerState('Events'); }}>
            <Text style={styles.searchButtonText}>events</Text>
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
