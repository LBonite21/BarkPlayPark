import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
} from "react-native";

class RatingScreen extends Component {
    render() {
        return (
            <View>
                <Text>Rating Screen</Text>
                <Text>Test</Text>
            </View>
        );
    };
};

export default RatingScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: "50%"
    }
});