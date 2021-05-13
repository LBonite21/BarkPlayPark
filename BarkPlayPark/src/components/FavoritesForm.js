import React, { useState, useEffect } from 'react';

const FavoritesForm = (props) => {
    const initValues = {
        parkName: '',
        rating: '',
    }

    const [values, setValues] = useState(initValues);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.addFavorite(values)
    }

    return (
        <form autoComplete='off' onSubmit={handleFormSubmit}>
            <div>
                <div>
                    <div>
                        <i></i>
                    </div>
                </div>
                <input placeholder='Park Name' name='parkName' value={values.parkName} onChange={handleInputChange} />
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <i></i>
                        </div>
                    </div>
                    <input placeholder='Rating' name='rating' value={values.rating} onChange={handleInputChange} />
                </div>
                <div>
                    <input type='submit' value='Save'></input>
                </div>
            </div>
        </form>
    );
}

export default FavoritesForm;