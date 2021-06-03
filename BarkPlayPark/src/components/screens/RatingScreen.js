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

    constructor(props) {
        super(props);

        this.state = {
            parkName: props.parkName,
            rating: props.rating,
            userRatingsTotal: props.userRatingsTotal
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.state.parkName}</Text>
                <Text>Rating: {this.state.rating} ({this.state.userRatingsTotal})</Text>
            </View>
        );
    };
};

export default RatingScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // top: "50%"
    }
});