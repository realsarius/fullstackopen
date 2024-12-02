import { useState } from 'react';

const useCountry = () => {
    const [country, setCountry] = useState(null);

    const saveCountry = (theCountry) => {
        if (theCountry) {
            setCountry({
                name: theCountry.name,
                capital: theCountry.capital,
                population: theCountry.population,
                flag: theCountry.flag,
            });
        } else {
            setCountry(null);
        }

    };

    return { country, saveCountry };
};

export default useCountry;
