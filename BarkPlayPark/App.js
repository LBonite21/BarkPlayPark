import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarkPlayPark from './src/components/BarkPlayPark';
import MapScreen from './src/components/screens/MapScreen';

export default function App() {
  return (
    <BarkPlayPark />
    // <MapScreen />
  );
}

