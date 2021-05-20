import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

const FavoritesForm = (props) => {
    const initValues = {
        parkName: '',
        rating: ''
    }

    const [values, setValues] = useState(initValues);

    const handleInputChange = e => {
        // const { name, value } = e
        setValues({
            // ...values,
            // [name]: value
            parkName: e
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.addFavorite(values)
    }

    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Park Name'
                    name='parkName'
                    defaultValue={values.parkName}
                    onChangeText={handleInputChange} /*Changed value to defualt value to remove error about controlled and uncontrolled inputs*/ />
            </View>
            <View>
                <TextInput placeholder='Rating' name='rating' defaultValue={values.rating} onChangeText={handleInputChange} />
            </View>
            <TouchableOpacity
                style={styles.center}
                title='Submit'
                onPress={handleFormSubmit}>
                <Text style={styles.button}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: "50%"
    },
    input: {
        height: 30,
        fontSize: 23,
        borderBottomWidth: 2,
        borderColor: 'lightgray',
        margin: 30
    },
    button: {
        fontSize: 20,
        padding: 8,
        textAlign: 'center',
        backgroundColor: 'white',
        width: 140,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#7f0000'
    },
    center: {
        display: 'flex',
        alignSelf: 'center'
    }
})

export default FavoritesForm;