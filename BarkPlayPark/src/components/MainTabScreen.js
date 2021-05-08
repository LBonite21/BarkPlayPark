import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";

import MapScreen from "./screens/MapScreen";
import FavScreen from "./screens/FavScreen";

const MapStack = createStackNavigator();
const FavStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MapStackScreen = ({ navigation }) => (
    <MapStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#7f0000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <MapStack.Screen
        name="Hoops"
        component={MapScreen}
        options={{
          title: " ",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              color= "#fff"
              size={25}
              backgroundColor="#7f0000"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () => (
            <Icon.Button 
              name="filter"
              backgroundColor="#7f0000"
            />
          ),
        }}
      />
    </MapStack.Navigator>
  );

  const FavStackScreen = ({ navigation }) => (
  
    <FavStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#7f0000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <FavStack.Screen
        name="NBA News"
        component={FavScreen}
        options={{
          title: " ",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#7f0000"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        }}
      />
    </FavStack.Navigator>
  );


const MainTabScreen = () => (

    <Tab.Navigator initialRouteName="Map" activeColor="#7f0000" barStyle={{ backgroundColor: "#fff" }}>
      <Tab.Screen
        name="Map"
        component={MapStackScreen}
        options={{
          tabBarLabel: "Map",
          tabBarColor: "#7f0000",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-map" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavStackScreen}
        options={{
          tabBarLabel: "Favorite Parks",
          tabBarColor: "#009387",
          tabBarIcon: ({ color }) => (
            <Icon name="bookmarks-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
  
  export default MainTabScreen;