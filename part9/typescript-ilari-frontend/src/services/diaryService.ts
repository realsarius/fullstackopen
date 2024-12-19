import axios from 'axios';
import { DiaryEntry, NewDiary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async () => {
    const response = await axios
        .get<DiaryEntry[]>(baseUrl);
    console.log(response.data);
    return response.data;
};

export const createDiary = async (object: NewDiary) => {
    try {
        // Make the POST request to create the diary entry
        const response = await axios.post<DiaryEntry>(baseUrl, object);

        // Return the data from the response if successful
        return response.data;
    } catch (error) {
        // Handle errors from the backend (e.g., validation errors)
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Backend Validation Error:', error.response.data);
                throw new Error(`Backend validation error: ${error.response.data.message || 'Invalid input'}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Network Error:', error.request);
                throw new Error('Network error: No response from the server.');
            } else {
                // Something happened in setting up the request
                console.error('Request Error:', error.message);
                throw new Error(`Request Error: ${error.message}`);
            }
        } else {
            // If it's not an Axios error, throw it as is
            console.error('Unknown Error:', error);
            throw error;
        }
    }
};

// export const createDiary = async (object: NewDiary) => {
//     const response = await axios
//         .post<DiaryEntry>(baseUrl, object);
//     return response.data;
// };