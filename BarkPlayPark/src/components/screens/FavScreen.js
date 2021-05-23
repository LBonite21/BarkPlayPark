import React from "react";
import {
    Text,
    StyleSheet,
    View,
    Alert
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import FavoriteForm from '../FavoritesForm';
import firebase from '../config';

export default class FavScreen extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            favoritesList: [],
        }
    }

    componentDidMount() {
        firebase.database().ref(`favorites`).on('value', snapshot => {
            let favoritesList = [];
            snapshot.forEach(snap => {
                var key = snap.key;
                var data = snap.val();
                favoritesList.push({key: key, text: data.text});
            });
            this.setState({
                favoritesList: favoritesList,
            });
        });
    }

    onDelete = (key) => {
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
                    onPress: () => firebase.database().ref(`favorites`).child(key).remove()
                }
            ]
        )) {}
    }

    render() {
        return (
            <>
                <Text style={styles.header}>Favorites List</Text>
                <View>
                    <View>
                        <View style={styles.columns}>
                            <Text style={{ flex: 1, marginLeft: 11, borderBottomWidth: 2 }}>Park Name</Text>
                            <Text style={{ flex: 2 }}>Action</Text>
                        </View>
                        {
                            this.state.favoritesList.map(data => {
                                console.log(data.key)
                                return (
                                    <View key={data.key}>
                                        <View style={styles.columns}>
                                            <Text style={styles.park}>{data.text}</Text>
                                            <View style={styles.heart}>
                                                <Icon name='heart' color='#770000' size={20} onPress={() => { this.onDelete(data.key) }}/>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </>
        )
    }

}

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