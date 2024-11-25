import {useEffect, useState} from 'react'
import Person from "./components/Person.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Title from "./components/Title.jsx";

import personService from "./service/personService.js";

import "./index.css";
import Message from "./components/Message.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('');
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
                console.log(initialPersons)
            })
    }, []);

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const personExists = persons.find(person => person.name === newName);

        console.log(personExists);

        if (personExists) {
            const confirmUpdate = window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)

            if (confirmUpdate) {
                const updatedPerson = {
                    ...personExists,
                    phone: newNumber,
                }

                personService
                    .updatePerson(personExists._id, updatedPerson)
                    .then(person => {
                        setPersons(persons.map(p => p._id === personExists._id ? person : p));
                        setMessage(`Updated number for ${person.name}`)
                        setIsError(false);
                        setNewName("");
                        setNewNumber("");
                        setTimeout(() => setMessage(""), 3000);
                    })
                    .catch(error => console.log("Error updating person: ", error));
            }
        } else {
            // if (newName.length < 3) {
            //     setIsError(true);
            //     setMessage("Name should be more then 3 characters");
            //     setTimeout(() => setMessage(""), 3000);
            // } else {
            const newPerson = {
                name: newName,
                phone: newNumber,
            }

            personService
                .create(newPerson)
                .then(person => {
                    setPersons(persons.concat(person));
                    setMessage(`Added ${person.name}`)
                    setIsError(false);
                    setNewName("");
                    setNewNumber("");
                    setTimeout(() => setMessage(""), 3000);
                })
                .catch(error => {
                    console.log("Error creating person:", error.response.data.error);
                    setIsError(true);
                    setMessage(error.response.data.error);
                    setTimeout(() => {
                        setMessage("");
                        setIsError(false);
                    }, 3000);
                });
            // }

        }
    }

    const onChangeHandler = (event) => {
        if (event.target.id === "name") {
            setNewName(event.target.value);
        } else if (event.target.id === "phone") {
            setNewNumber(event.target.value);
        } else if (event.target.id === "filterName") {
            setFilterName(event.target.value);
        }
    }

    return (
        <div>
            <Title text={"Phonebook"}/>
            {message && <Message message={message} isError={isError}/>}
            <Filter filterName={filterName} onChangeHandler={onChangeHandler}/>

            <Title text={"add a new"}/>
            <PersonForm formSubmitHandler={formSubmitHandler} newName={newName} newNumber={newNumber}
                        onChangeHandler={onChangeHandler}/>

            <Title text={"Numbers"}/>
            {persons &&
                <Person filterName={filterName} persons={persons} setPersons={setPersons} setMessage={setMessage}
                        setIsError={setIsError}/>
            }

        </div>
    )
}

export default App;