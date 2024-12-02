import { useState, useEffect } from 'react';
import useResource from './hooks/useResource.js';
import useField from './hooks/useField.js';

const App = () => {
    const content = useField('text');
    const name = useField('text');
    const number = useField('text');

    const [notes, noteService] = useResource('http://localhost:3005/notes', 'note');
    const [persons, personService] = useResource('http://localhost:3005/persons', 'person');

    useEffect(() => {
        noteService.getAll().then(r => r);
        personService.getAll().then(r => r);
    }, []);

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        noteService.create({ content: content.inputFields.value });
        content.resetField();
    };

    const handlePersonSubmit = (event) => {
        event.preventDefault();
        personService.create({
            name: name.inputFields.value,
            number: number.inputFields.value,
        });
        name.resetField();
        number.resetField();
    };

    return (
        <div>
            <h2>notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content.inputFields} />
                <button>create</button>
            </form>
            <ul>
                {notes &&
                    notes.map(n => <li key={n.id}>{n.content}</li>)}
            </ul>


            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name.inputFields} /> <br />
                number <input {...number.inputFields} />
                <button>create</button>
            </form>
            <ul>
                {persons &&
                    persons.map(n => <li key={n.id}>{n.name} {n.number}</li>)}
            </ul>

        </div>
    );
};

export default App;