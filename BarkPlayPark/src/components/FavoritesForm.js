import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
                <TextInput placeholder='Park Name' name='parkName' defaultValue={values.parkName} onChangeText={handleInputChange} /*Changed value to defualt value to remove error about controlled and uncontrolled inputs*//> 
            </View>
            <View>
                {/* <TextInput placeholder='Rating' name='rating' defaultValue={values.rating} onChangeText={handleInputChange} /> */}
            </View>
            <TouchableOpacity title='Submit' onPress={handleFormSubmit}>
                <Text style={{fontSize: 15, textAlign: 'center', backgroundColor: 'lightgray', width: 170, borderRadius: 5, borderWidth: 1, borderColor: 'gray'}}>Add To Favorites</Text>
            </TouchableOpacity>
        </View>
    );
}

export default FavoritesForm;