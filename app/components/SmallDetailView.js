import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';

import styles from '../styles/style';

//TODOs:
//add color selector for geometry and a color state, fix timestamp on ev  ent request obj
//implement rating on detail view for user generated content, every time a rating is made, will send post request to server
//implement edit view, which let user remove the obj
//show countdown on obj

class SmallDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false,
      upvote: false,
      downvote: false,
      upvotes: this.props.place.upvotes || 0,
      downvotes: this.props.place.downvotes || 0
    };
  }

  submitVote(vote) {
    console.log('submitVote');
    let focalPlace = this.props.place;
    let username = this.props.user.username;
    let voteObj = {
      name: focalPlace.name,
      latitude: focalPlace.latitude,
      longitude: focalPlace.longitude,
      username: username,
      vote: vote
    };
    // this.props.action.sendVote(voteObj);
  }

  upvote() {
    this.setState({upvote: true, downvote: false, voted: true, upvotes: this.props.place.upvotes + 1 || 1, downvotes: this.props.place.downvotes || 0});
    // this.submitVote('upvote');
  }

  downvote() {
    this.setState({upvote: false, downvote: true, voted: true, upvotes: this.props.place.upvotes || 0, downvotes: this.props.place.downvotes + 1 || 1});
    // this.submitVote('downvote');
  }

  render() {
    let buttons = (
        <View style={styles.detailPreview_iconColumn}>
          <View style={styles.detailPreview_Btn}>
            <TouchableOpacity onPress={this.props.closePanel}>
              <Image style={styles.detailPreview_closeBtn} source={require('../assets/close.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      );

    let upvoteIcon = (
      <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}} onPress={() => {this.upvote()}}>
        <Image style={styles.detailPreview_icon} source={require('../assets/upvote.png')}></Image>
      </TouchableOpacity>
    );

    let downvoteIcon = (
      <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}} onPress={() => {this.downvote()}}>
        <Image style={styles.detailPreview_icon} source={require('../assets/downvote.png')}></Image>
      </TouchableOpacity>
    );

    if (this.state.upvote) {
      upvoteIcon = (
        <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}}>
          <Image style={styles.detailPreview_icon} source={require('../assets/upvoted.png')}></Image>
        </TouchableOpacity>
      );
      downvoteIcon = (
        <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}} onPress={() => {this.downvote()}}>
          <Image style={styles.detailPreview_icon} source={require('../assets/downvote.png')}></Image>
        </TouchableOpacity>
      );

    } else if (this.state.downvote) {
      upvoteIcon = (
        <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}} onPress={() => {this.upvote()}}>
          <Image style={styles.detailPreview_icon} source={require('../assets/upvote.png')}></Image>
        </TouchableOpacity>
      );
      downvoteIcon = (
        <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}}>
          <Image style={styles.detailPreview_icon} source={require('../assets/downvoted.png')}></Image>
        </TouchableOpacity>
      );
    }

    if (this.props.place.type && this.props.place.type === 'userPlace' || this.props.place.type === 'userEvent') {
      buttons = (
        <View style={styles.detailPreview_iconColumn}>
          <View style={styles.detailPreview_Btn}>
            <TouchableOpacity onPress={this.props.closePanel}>
              <Image style={styles.detailPreview_closeBtn} source={require('../assets/close.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}><Text>{this.state.upvotes}</Text>{upvoteIcon}</View>
          <View style={{flex: 1, flexDirection: 'row'}}><Text>{this.state.downvotes}</Text>{downvoteIcon}</View>
        </View>
      );
    }

    return (
      <View style={styles.detailPreview}>
        <View style={styles.detailPreview_container}>
          <View style={styles.detailPreview_description}>
            <TouchableOpacity>
              <Text style={styles.detailPreview_heading}>{this.props.place.name}</Text>
            </TouchableOpacity>
            <View style={{paddingLeft: 10}}>
              <Image style={styles.detailPreview_image} source={{uri: 'http://kohlerglobalprojects.com/assets/Uploads/DetailThumb/Hotel-Indigo-Thumbnail.jpg'}}></Image>
            </View>
          </View>
          {buttons}
        </View>
      </View>
    );
  }

};

const mapStateToProps = function(state) {
  return {
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return { action: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallDetailView);