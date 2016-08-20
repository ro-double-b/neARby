import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableHighlight,
  Slider,
} from 'react-native';
import styles from '../styles/style';

//TODOs:
//add color selector for geometry and a color state, fix timestamp on ev  ent request obj
//implement rating on detail view for user generated content, every time a rating is made, will send post request to server
//implement edit view, which let user remove the obj
//show countdown on obj

const SmallDetailView = (props) => {
  return (
    <View style={styles.detailPreview}>

      <View style={styles.detailPreview_container}>

        <View style={styles.detailPreview_description}>
          <TouchableOpacity>
            <Text style={styles.detailPreview_heading}>{props.place.name}</Text>
          </TouchableOpacity>
          <View style={{paddingLeft: 10}}>
            <Image style={styles.detailPreview_image} source={{uri: 'http://kohlerglobalprojects.com/assets/Uploads/DetailThumb/Hotel-Indigo-Thumbnail.jpg'}}></Image>
          </View>
        </View>

        <View style={styles.detailPreview_iconColumn}>
          <View style={styles.detailPreview_Btn}>
            <TouchableOpacity onPress={props.closePanel}>
              <Image style={styles.detailPreview_closeBtn} source={require('../assets/close.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.detailPreview_Btn}>
            <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}}>
              <Image style={styles.detailPreview_icon} source={require('../assets/thumbs-up-icon.png')}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.detailPreview_Btn}>
            <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5}}>
              <Image style={styles.detailPreview_icon} source={require('../assets/thumbs-down-icon.png')}></Image>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </View>
  );
};



export default SmallDetailView;
