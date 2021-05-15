import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

class MapScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        fontLoaded: false,
        latitude: 40.7739326967638,
        longitude: -111.90328146937225,
        coordinates: [],
        dogParks: [],
      };
    }
  
    componentDidMount() {
      this.getLocation();
      this.getDogParks();
    }
  
    componentWillUnmount() {
      this.getDogParks();
    }
  
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          Alert.alert(error.message.toString());
        },
        {
          showLocationDialog: true,
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    }
  
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
  
    render() {
      let myLocation = {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      };
  
      return (
        <View style={styles.container}>
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
            <AddCourt />
            <Marker
              coordinate={myLocation}
            //   image={require("../../images/myPin.png")}
            />
           
  
            {this.state.dogParks.map((court, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: court.geometry.location.lat,
                  longitude: court.geometry.location.lng,
                }}
                // image={require("../../images/pin.png")}
              >
                <Callout>
                  <View>
                  <Text>{court.name}</Text>
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
  });

