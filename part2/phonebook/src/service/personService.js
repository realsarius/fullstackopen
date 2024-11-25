import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(response => response.data);
}

const deletePerson = personId => {
    const request = axios.delete(`${baseUrl}/${personId}`);
    return request.then(response => response.data);
}

const updatePerson = (personId, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${personId}`, updatedPerson);
    return request.then(response => response.data);
}

export default {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updatePerson: updatePerson
}