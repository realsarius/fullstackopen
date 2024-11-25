import PropTypes from "prop-types";
import personService from "../service/personService.js";

const Person = ({filterName, persons, setPersons, setMessage, setIsError}) => {
    const deletePerson = (event) => {
        event.preventDefault();
        const personId = event.target.id;
        console.log(event.target);

        const confirmDelete = window.confirm("Are you sure you want to delete this person?");

        if (confirmDelete) {
            personService
                .deletePerson(personId)
                .then(response => {
                    setPersons(persons.filter(person => person._id !== personId));
                    setMessage("Person deleted successfully.");
                    console.log("Person deleted successfully.", response)
                    setIsError(false);
                    setTimeout(() => setMessage(""), 3000);
                })
                .catch(error => {
                    const person = persons.find(p => p._id === personId);
                    if (person) {
                        setMessage(`Information for ${person.name} has already been removed from the server.`);
                    } else {
                        setMessage("Error deleting person.");
                        console.log("Error deleting person.", error);
                    }
                    setIsError(true);
                    setTimeout(() => setMessage(""), 3000);
                });
        } else {
            console.log("Delete canceled");
        }
    };


    return (
        <ul>
            {(filterName
                    ? persons.filter(person =>
                        person.name.toLowerCase().includes(filterName.toLowerCase())
                    )
                    : persons
            ).map(person => (
                <li key={person._id}>
                    {person.name} {person.phone}
                    <button id={person._id} onClick={deletePerson}>delete</button>
                </li>
            ))}
        </ul>
    )
}

Person.propTypes = {
    filterName: PropTypes.string,
    persons: PropTypes.arrayOf(PropTypes.object),
    setPersons: PropTypes.func,
    message: PropTypes.string,
    setMessage: PropTypes.func,
    setIsError: PropTypes.func
}

export default Person;