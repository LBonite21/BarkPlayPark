import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  TouchableHighlight,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import ReactDOM from "react-dom";
import RatingScreen from "./RatingScreen";
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
        // console.log(json.results[1].photos[0].photo_reference);
      });
  }

  ratingScreen() {
    this.props.navigation.navigate("Rating");
  }

  render() {
    let myLocation = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    // const { navigation } = props;

    // const RatingStack = createStackNavigator({
    //     Rating: {
    //         screen: RatingScreen
    //     }
    // });

    // const AppContainer = createAppContainer(RatingStack);

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
          <MapView.Marker
            coordinate={myLocation}
            image={require("../images/myPin.png")}
          />

          {this.state.dogParks.map((dogPark, index) => {
            let photos = dogPark.photos;
            console.log(dogPark);
            return photos === undefined ? (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: dogPark.geometry.location.lat,
                  longitude: dogPark.geometry.location.lng,
                }}
                image={require("../images/pin.png")}
              >
                <MapView.Callout>
                  <View>
                    <RatingScreen
                      parkName={dogPark.name}
                      rating={dogPark.rating}
                      userRatingsTotal={dogPark.user_ratings_total}
                      photo="ATtYBwK7UrhpDg-B8RiTMe12ZVLfeiXBe1HOeN0eNsUZjpGJxTUE_ihsYHxrMfrqbzSdrGFiyq9svmqXrLW1kPO2AhV8H9B6uPZsbDfIyfqQmgJtnlCswCD1OeZr3j7-GT5YfM4SUYTcQOt1Zqlz74wbXb6cOEmJ3SL2Y3mBzg3eFBr2dX_Q"
                    />
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ) : (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: dogPark.geometry.location.lat,
                  longitude: dogPark.geometry.location.lng,
                }}
                image={require("../images/pin.png")}
              >
                <MapView.Callout>
                  <View>
                    <RatingScreen
                      parkName={dogPark.name}
                      rating={dogPark.rating}
                      userRatingsTotal={dogPark.user_ratings_total}
                      address={dogPark.formatted_address}
                      photo={photos[0].photo_reference}
                    />
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}

// ReactDOM.render(<MapScreen />, document.getElementById("root"));

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
