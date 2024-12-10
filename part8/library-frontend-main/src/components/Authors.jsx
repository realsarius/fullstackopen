import { useMutation, useQuery } from '@apollo/client';
import Select from 'react-select';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/queries.js';
import { useState } from 'react';

const Authors = (props) => {
    const result = useQuery(ALL_AUTHORS);

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [born, setBorn] = useState('');

    if (result.loading) {
        return <div>loading...</div>;
    }

    if (!props.show) {
        return null;
    }

    const authors = result.data.allAuthors;

    const authorOptions = authors.map((author) => ({
        value: author.name,
        label: author.name,
    }));

    const updateAuthorBirthyear = (event) => {
        event.preventDefault();

        if (!selectedAuthor) {
            alert('Please select an author!');
            return;
        }

        editAuthor({
            variables: {
                name: selectedAuthor.value,
                setBornTo: parseInt(born),
            },
        });

        setSelectedAuthor(null);
        setBorn('');
    };

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>born</th>
                    <th>books</th>
                </tr>
                {authors.map((a) => (
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Set birthyear</h2>
            <form onSubmit={updateAuthorBirthyear}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Select Author: </label>
                    <Select
                        options={authorOptions}
                        value={selectedAuthor}
                        onChange={setSelectedAuthor}
                        placeholder="Select an author"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Born: </label>
                    <input
                        type="text"
                        name="born"
                        id="born"
                        value={born}
                        onChange={(e) => setBorn(e.target.value)}
                    />
                </div>
                <button type="submit">Update Author</button>
            </form>
        </div>
    );
};

export default Authors;
