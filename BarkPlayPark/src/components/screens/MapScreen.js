import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
} from "react-native";

class MapScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Map Screen</Text>
            </View>
        );
    };
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: "50%"
    }
});

// https://maps.googleapis.com/maps/api/place/textsearch/json?query=dog+park&location=40.773892264641184,-111.90328246417559&radius=10000&key=AIzaSyCst7jCRy3gYwYbxhoIlxgLT79CwHGpYZA

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.773892264641184,-111.90328246417559&keyword=dogparks&radius=10000&rankby=prominence&key=AIzaSyCst7jCRy3gYwYbxhoIlxgLT79CwHGpYZA