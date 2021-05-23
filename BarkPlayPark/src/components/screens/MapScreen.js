import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Dimensions, TextInput, TouchableOpacity, Keyboard, Button } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from '../config';
import { GooglePlacesAutoComplete } from 'react-native-google-places-autocomplete';

// import Geolocation from '@react-native-community/geolocation';

class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      latitude: 40.7739326967638,
      longitude: -111.90328146937225,
      coordinates: [],
      dogParks: [],
      errMsg: "",
      messageText: null,
      sendButton: false,
      messages: []
    };
  }

  componentDidMount() {
    this.getLocation();
    this.getDogParks();
  }

  componentWillUnmount() {
    this.getDogParks();
  }

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        errMsg: "Permission to access location was denied",
      });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  getDogParks() {
    let API_KEY = `AIzaSyCst7jCRy3gYwYbxhoIlxgLT79CwHGpYZA`;
    let FETCH_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=dog+park&location=${this.state.latitude},${this.state.longitude}&radius=10000&key=${API_KEY}`;

    fetch(FETCH_URL, { method: "GET" })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ dogParks: json.results });
        // console.log(json);
      });
  }

  searchLocation = async (text) => {

  }

  onSendPress() {
    if (this.state.sendButton) {
      firebase.database().ref('favorites').push({
        text: this.state.messageText,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then(() => {
        this.setState({ messageText: null });
        Keyboard.dismiss();
      }).catch((err) => {
        console.log(err)
      });
    }
  }

  render() {
    let myLocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput placeholder="Search..." style={styles.input} onChangeText={messageText => this.setState({ messageText: messageText, sendButton: messageText.length > 0 })} />
          <View style={styles.sendButton}>
            <TouchableOpacity onPress={this.onSendPress.bind(this)}>
              <Icon name='send' size={22} color='#7f0000'></Icon>
            </TouchableOpacity>
            <View style={styles.buttonStyle}>
            </View>
          </View>
        </View>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={myLocation}
          //   image={require("../images/pfp.png")}
          />

          {this.state.dogParks.map((dogPark, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: dogPark.geometry.location.lat,
                longitude: dogPark.geometry.location.lng,
              }}
            // image={require("../../images/pin.png")}
            >
              <Callout>
                <View>
                  <Text>{dogPark.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  map_btn: {
    marginTop: 80,
    marginLeft: 265,
    backgroundColor: "#7f0000",
    width: 130,
    // height: 80,
    padding: 8,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 2,
  },

  btn_text: {
    // marginTop: 18,
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    fontFamily: "OctinCollege-Bold",
    letterSpacing: 2,
  },
  inputWrapper: {
    width: '85%',
    position: 'absolute',
    padding: 10,
    top: 0,
    left: 30,
    zIndex: 100
  },
  input: {
    height: 45,
    paddingVertical: 10,
    paddingRight: 50,
    paddingLeft: 10,
    marginTop: 12,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: '#ccc',
    backgroundColor: 'white'
  },
  sendButton: {
    position: 'absolute',
    top: 23.5,
    right: 11,
    opacity: 0.3,
    padding: 9.5
  },
});
