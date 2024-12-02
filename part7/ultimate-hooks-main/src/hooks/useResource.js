import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


const useResource = (baseUrl, type) => {
    const [resources, setResources] = useState([]);

    // ...

    const getAll = async () => {
        const response = await axios.get(baseUrl);
        setResources(response.data);
    };

    const create = async (resource) => {
        let newResource;

        if (type === 'note') {
            newResource = {
                content: resource.content,
                id: uuidv4(),
            };
        } else if (type === 'person') {
            newResource = {
                id: uuidv4(),
                name: resource.name,
                number: resource.number,
            };
        }

        try {
            const response = await axios.post(baseUrl, newResource);
            const savedResource = response.data;

            setResources(prevResources => [...prevResources, savedResource]);

            return savedResource;
        } catch (error) {
            console.error('Error creating resource:', error);
            throw error;
        }
    };


    const service = {
        create,
        getAll,
    };

    return [
        resources, service,
    ];
};

export default useResource;