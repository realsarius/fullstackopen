import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createNew = async (content) => {
    const object = {
        anecdote: content,
        votes: 0,
        id: uuidv4(),
    };

    const response = await axios.post(baseUrl, object);
    return response.data;
};

const increaseVote = async (id, updatedVotes) => {
    const response = await axios.patch(`${baseUrl}/${id}`, {
        votes: updatedVotes,
    });

    return response.data;
};

export default { getAll, createNew, increaseVote };