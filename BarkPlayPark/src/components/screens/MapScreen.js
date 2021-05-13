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

