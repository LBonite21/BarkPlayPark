import React from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import Icon from "react-native-vector-icons/Ionicons";

export default function DrawerContent(props) {
  //   const paperTheme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1.5,
              top: 67
            }}
          />
          <View style={styles.drawerNavSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image source={require("./images/pfp.png")} size={50} />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Bark Play Park</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="map-outline" color={color} size={size} />
              )}
              label="Map"
              onPress={() => {
                props.navigation.navigate("Map");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="bookmarks-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Favorites"
              onPress={() => {
                props.navigation.navigate("Favorites");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerNavSection: {
    paddingLeft: 20,
    marginTop: -10
  },
  title: {
    fontSize: 16,
    marginTop: 11,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
