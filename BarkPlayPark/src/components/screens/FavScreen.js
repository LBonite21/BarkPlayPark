import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    Alert
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import FavoriteForm from '../FavoritesForm';
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

    const addFavorite = (obj) => {
        if (id == '') { //
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

    const onDelete = (key) => {
        if (Alert.alert(
            'Remove',
            'Are you sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log("Cancel Pressed")
                },
                {
                    text: 'Remove',
                    onPress: () => db.child(`favorites/${key}`).remove(
                        (err) => {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                setId('') //removes from list realtime
                            }
                        }
                    )
                }
            ]
        )) {

        }
    }
    return (
        <>
            <Text style={styles.header}>Favorites List</Text>
            <View>
                <FavoriteForm {...({ addFavorite, id, favoriteObjects })} />
                <View>
                    <View style={styles.columns}>
                        <Text style={{ flex: 1, marginLeft: 11, borderBottomWidth: 2 }}>Park Name</Text>
                        {/* <Text style={{ flex: 2 }}>Rating</Text> */}
                        <Text style={{ flex: 2 }}>Action</Text>
                    </View>
                    {
                        Object.keys(favoriteObjects).map(id => {
                            return (
                                <View key={id}>
                                    <View style={styles.columns}>
                                        <Text style={styles.park}> {favoriteObjects[id].parkName} </Text>
                                        {/* <View style={{ flex: 2 }}> {favoriteObjects[id].rating} </View> */}
                                        <View style={styles.heart}>
                                            <Icon name='heart' color='#770000' size={20} onPress={() => { onDelete(id) }} /* Getting errors in console due to Icon being wrapped by View I believe */ />
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </>
    );
}

export default FavScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: "50%"
    },
    header: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 10
    },
    columns: {
        display: 'flex',
        flexDirection: 'row',
        width: 850,
        paddingLeft: 33
    },
    center: {
        display: 'flex',
        alignSelf: 'center'
    },
    park: {
        flex: 1,
        fontSize: 18
    },
    heart: {
        flex: 2,
        marginBottom: 5,
        paddingLeft: 27,
    }
});