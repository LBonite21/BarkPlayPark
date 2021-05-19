import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View
} from "react-native";
import FavoriteForm from '../FavoritesForm';
import Icon from "react-native-vector-icons/Ionicons";
import { db } from '../config';

const FavScreen = ({ navigation }) => {
    const [favoriteObjects, setFavoriteObjects] = useState({})
    const [id, setId] = useState('');

    useEffect(() => {
        db.child('favorites').on('value', snapshot => {
            if (snapshot.val() != null) {
                setFavoriteObjects({
                    ...snapshot.val()
                })
            } else {
                setFavoriteObjects({});
            }
        })
    }, [])

    const addFavorite = obj => {
        if (id == '') {
            db.child('favorites').push(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
        }
    }

    const onDelete = key => {
        if (window.confirm('Do you want to remove this from your favorites?')) {
            db.child(`favorites/${key}`).remove(
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setId('')
                    }
                }
            )
        }
    }

    return (
        <View>
            <View>
                <Text style={styles.header}>Favorites List</Text>
            </View>
            <View>
                <FavoriteForm {
                    ...({
                        addFavorite,
                        id,
                        favoriteObjects
                    })}
                />
                <View>
                    <View style={styles.columns}>
                        <Text style={{ flex: 1 }}>Park Name</Text>
                        {/* <Text style={{ flex: 2 }}>Rating</Text> */}
                        <Text style={{ flex: 2 }}>Action</Text>
                    </View>
                    {
                        Object.keys(favoriteObjects).map(id => {
                            return (
                                <View key={id}>
                                    <View style={styles.columns}>
                                        <Text style={{ flex: 1 }}>{favoriteObjects[id].parkName}</Text>
                                        {/* <View style={{ flex: 2 }}> {favoriteObjects[id].rating}</View> */}
                                        <View style={{ flex: 2 }}>
                                            <Icon name='heart' color='#770000' onPress={() => { onDelete(id) }} />
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default FavScreen;

<Text style={styles.header}>Favorites List</Text>