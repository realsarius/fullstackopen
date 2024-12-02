import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';

const getCountry = async (name) => {
    try {
        const response = await axios.get(`${baseUrl}/${name}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Country "${name}" not found.`);
            return null;
        } else {
            console.error('An error occurred while fetching the country:', error.message);
            throw error;
        }
    }
};

export { getCountry };
