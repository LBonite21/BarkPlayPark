import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Dimensions,
} from "react-native";

const FavScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Text>Favorite Screen</Text>
        </View>
    );
};

export default FavScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: "50%"
    }
});