import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCountry from './hooks/useCountry';
import Country from './components/Country';
import useField from './hooks/useField';
import { getCountry } from './services/countryService';

const App = () => {
    const nameInput = useField('text');
    const { country, saveCountry } = useCountry();

    const fetch = async (event) => {
        event.preventDefault();

        if (nameInput.inputFields.value) {
            try {
                const theCountry = await getCountry(nameInput.inputFields.value);

                const neededCountryInfo = {
                    name: theCountry.name.common,
                    capital: theCountry.capital[0],
                    population: theCountry.population,
                    flag: theCountry.flags.png,
                };

                saveCountry(neededCountryInfo);

                console.log('Country data saved:', neededCountryInfo);
            } catch (error) {
                console.error('Error fetching country:', error);
                saveCountry(null);
            }
        } else {
            console.log('field can not be empty.');
        }

    };

    const handleResetInputField = (event) => {
        event.preventDefault();
        nameInput.resetField();
    };

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput.inputFields} placeholder="Enter country name" />
                <button type="submit">Fetch Country</button>
                <button onClick={handleResetInputField}>reset</button>
            </form>

            {country ? (
                <div>
                    <h2>{country.name}</h2>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                    <img src={country.flag} alt={`Flag of ${country.name}`} width="100" />
                </div>
            ) : <div><p>not found...</p></div>}

        </div>
    );
};

export default App;