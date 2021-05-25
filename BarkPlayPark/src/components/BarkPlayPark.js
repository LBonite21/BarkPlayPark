import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainTabScreen from "./MainTabScreen";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const BarkPlayPark = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        {/* <Drawer.Screen name="Rating" component={RatingScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default BarkPlayPark;
