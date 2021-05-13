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
        if (id == '')
            db.child('favorites').push(
                obj,
                err => {
                    if (err) {
                        console.log(err)
                    }
                }
            )
    }

    const onDelete = key => {
        if (window.confirm('Do you want to remove this from your favorites?')) {
            db.child(`favorites/${key}`).remove(
                err => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        setId('') //removes from list realtime
                    }
                }
            )
        }
    }

    return(
        <>
            <h1>Favorites List</h1>
            <View>
                <FavoriteForm {...({ addFavorite, id, favoriteObjects })} />
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Park Name</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(favoriteObjects).map(id => {
                                    return <tr key={id}>
                                        <td> {favoriteObjects[id].parkName} </td>
                                        <td> {favoriteObjects[id].rating} </td>
                                        <td>
                                            <Icon name='heart' color='#770000' onClick={() => { onDelete(id) }} />
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </View>
        </>
    );
};

export default FavScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: "50%"
    }
});