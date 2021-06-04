import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
} from "react-native";

class RatingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parkName: props.parkName,
      rating: props.rating,
      userRatingsTotal: props.userRatingsTotal,
      photo: props.photo,
      address: props.address,
      API_KEY: `AIzaSyCst7jCRy3gYwYbxhoIlxgLT79CwHGpYZA`,
    };
  }

  render() {
    // console.log(
    //   `https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.state.photo}&sensor=false&maxheight=4000&maxwidth=3000&key=${this.state.API_KEY}`
    // );
    return (
      <View style={styles.container}>
        <Text style={styles.parkName}>{this.state.parkName}</Text>
        <Text style={styles.rating}>
          Rating: {this.state.rating} ({this.state.userRatingsTotal})
        </Text>
        <Text style={styles.address}>{this.state.address}</Text>
        <Image
          style={styles.photo}
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.state.photo}&sensor=false&maxheight=4000&maxwidth=3000&key=${this.state.API_KEY}`,
          }}
        />
      </View>
    );
  }
}

export default RatingScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 8,
    // top: "50%"
  },
  parkName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8
  },
  address: {
    width: 180,
    flexShrink: 1,
    textAlign: "center",
  },
  rating: {
    fontSize: 14,
    marginBottom: 8
  },    
  photo: {
    height: 150,
    width: 150,
    borderWidth: 1.5,
    borderRadius: 4,
    borderColor: "#000",
    overflow: "hidden",
    marginTop: 10,
  },
});
