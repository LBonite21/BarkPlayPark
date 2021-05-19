import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import FavoriteForm from "../FavoritesForm";
import { db } from "../config";

const FavScreen = ({ navigation }) => {
  const [favoriteObjects, setFavoriteObjects] = useState({});
  const [id, setId] = useState("");

  useEffect(() => {
    db.child("favorites").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setFavoriteObjects({
          ...snapshot.val(),
        });
      } else {
        setFavoriteObjects({});
      }
    });
  }, []);

  const addFavorite = (obj) => {
    if (id == "") {
      //
      db.child("favorites").push(obj, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Do you want to remove this from your favorites?")) {
      db.child(`favorites/${key}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          setId(""); //removes from list realtime
        }
      });
    }
  };

  return (
    <>
      <Text style={{ fontSize: 30 }}>Favorites List</Text>
      <View>
        <FavoriteForm {...{ addFavorite, id, favoriteObjects }} />
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>Park Name</Text>
            <Text style={{ flex: 2 }}>Rating</Text>
            <Text style={{ flex: 3 }}>Action</Text>
          </View>

          {Object.keys(favoriteObjects).map((id) => {
            <View key={id}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  {" "}
                  {favoriteObjects[id].parkName}{" "}
                </View>
                <View style={{ flex: 2 }}> {favoriteObjects[id].rating} </View>
                <View style={{ flex: 3 }}>
                  <Icon
                    name="heart"
                    color="#770000"
                    onPress={() => {
                      onDelete(id);
                    }} /* Getting errors in console due to Icon being wrapped by View I believe */
                  />
                </View>
              </View>
            </View>;
          })}
        </View>
      </View>
    </>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    top: "50%",
  },
});
