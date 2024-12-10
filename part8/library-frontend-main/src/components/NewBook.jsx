import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Select from 'react-select';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries/queries.js';

const NewBook = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    const { data, loading, error } = useQuery(ALL_AUTHORS);

    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    });

    if (loading) return <p>Loading authors...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const authorOptions = data.allAuthors.map((author) => ({
        value: author.id,
        label: author.name,
    }));

    const submit = async (event) => {
        event.preventDefault();

        console.log('add book...');
        addBook({
            variables: {
                title,
                author,
                published: parseInt(published),
                genres,
            },
        });

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    };

    const handleAuthorChange = (selectedOption) => {
        setAuthor(selectedOption ? selectedOption.value : '');
    };

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <Select
                        options={authorOptions}
                        value={authorOptions.find((option) => option.value === author)}  // This matches the selected option
                        onChange={handleAuthorChange}
                        placeholder="Select an author"
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    );
};

export default NewBook;
